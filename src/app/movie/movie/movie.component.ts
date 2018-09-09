import { Component, OnDestroy, OnInit } from '@angular/core';
import { OmdbapiService } from '@exam-core/omdbapi.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Movie, MovieType, RequestBySearch } from '@exam-app/domain';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  movies$: Observable<Movie[]>;
  totalResults: string;

  movieCtrl = new FormControl();

  s: string;
  type: MovieType;
  y: string;
  page: number;

  private searchTerms = new Subject<RequestBySearch>();

  constructor(private _omdbapiService: OmdbapiService) {
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: RequestBySearch) => {
        return this._omdbapiService.findBySearch(term).pipe(
          tap(_ => this.totalResults = _.totalResults),
          map(_ => _.Search as Movie[])
        );
      })
    );
  }

  ngOnDestroy(): void {
  }

  search(term?: string): void {

    const req = {
      s: term,
      type: this.type,
      y: this.y,
      page: this.page
    };

    this.searchTerms.next(req);
  }
}
