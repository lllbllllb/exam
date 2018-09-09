import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Movie, MovieType, RequestBySearch } from '@exam-app/domain';
import { FormControl, Validators } from '@angular/forms';
import { OmdbapiService } from '@exam-core/omdbapi.service';
import { debounceTime, distinctUntilChanged, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { EventService } from '@exam-core/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {

  apikeyCtrl: FormControl;
  showApikey: boolean;

  movies$: Observable<Movie[]>;
  totalResults: string;

  movieCtrl: FormControl;
  types: MovieType[];
  years: number[];

  type: MovieType;
  year: number;
  page: number;

  private searchTerms = new Subject<RequestBySearch>();
  private readonly defaultImg: string;
  private _onDestroy$ = new Subject<void>();

  @Output() selectedMovie = new EventEmitter<Movie>();
  @Output() acceptedMovie = new EventEmitter<boolean>();

  constructor(private _omdbapiService: OmdbapiService,
              private _eventService: EventService,
              private _router: Router) {

    this.apikeyCtrl = new FormControl('', [Validators.required]);
    this.movieCtrl = new FormControl('', [Validators.required]);
    this.types = [MovieType.movie, MovieType.series, MovieType.episode];
    this.years = MovieSearchComponent.generateYears(1900);
    this.defaultImg = 'https://st3.depositphotos.com/10544526/18940/v/1600/depositphotos_189407882-stock-illustration-skull-pirate-jolly-roger-skull.jpg';
  }

  private static generateYears(from: number): number[] {
    const res = [];
    const currentYear = new Date().getFullYear();

    for (let i = 0; i <= currentYear - from; i++) {
      res.unshift(from + i);
    }

    return res;
  }

  ngOnInit(): void {
    this.restoreApiKey();
    this.getMovies();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  private restoreApiKey(): void {
    const apikey = sessionStorage.getItem('apikey');
    if (apikey) {
      this.apikeyCtrl.setValue(sessionStorage.getItem('apikey'));
    }
  }

  private getMovies(): void {
    this.movies$ = this.searchTerms.pipe(
      takeUntil(this._onDestroy$),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: RequestBySearch) => {
        return this._omdbapiService.findBySearch$(term).pipe(
          take(1),
          tap(_ => this.totalResults = _.totalResults),
          map(_ => _.Search as Movie[])
        );
      })
    );
  }

  saveApikey() {
    if (this.apikeyCtrl.value && this.apikeyCtrl.value.length > 7) {
      sessionStorage.setItem('apikey', this.apikeyCtrl.value);
    }
  }

  search(): void {
    const req = {
      s: this.movieCtrl.value,
      type: this.type,
      y: this.year,
      page: this.page
    };

    if (this.movieCtrl.valid && this.apikeyCtrl.valid) {
      this.searchTerms.next(req);
    }
  }

  selectMovie(): void {
    this.selectedMovie.emit(this.movieCtrl.value);
  }

  displayMovie(m: Movie): string {
    return m ? m.Title : null;
  }

  gotoDetails(imdbID: string) {
    this._router.navigate(['movie/' + imdbID]);
  }

  acceptMovie(): void {
    this._eventService.movie = this.movieCtrl.value;
  }

  imgErrorHandler(event) {
    event.target.src = this.defaultImg;
  }
}
