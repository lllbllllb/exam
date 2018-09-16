import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Movie, MovieType, RequestBySearch } from '@exam-app/domain';
import { FormControl, Validators } from '@angular/forms';
import { OmdbapiService } from '@exam-core/omdbapi.service';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { EventService } from '@exam-core/event.service';
import { Router } from '@angular/router';
import { DataService } from '@exam-core/data.service';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { AppUser } from '@exam-domain/app-user';
import { HttpErrorResponse } from '@angular/common/http';
import { ZoomImageDialogComponent } from '@exam-shared/zoom-image-dialog/zoom-image-dialog.component';
import { LinkApiKeyToAliasDialogComponent } from '@exam-shared/link-api-key-to-alias-dialog/link-api-key-to-alias-dialog.component';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {

  apikeyCtrl: FormControl;
  showApikey: boolean;
  apiKeyInvalid: boolean;

  aliasCtrl: FormControl;
  showAlias: boolean;

  linkedApikeyAlias: boolean;

  movies$: Observable<Movie[]>;
  movies: Movie[] = [];
  totalResults: string;

  movieCtrl: FormControl;
  types: MovieType[];
  years: number[];

  type: MovieType;
  year: number;
  page: number;

  private searchTerms$ = new Subject<RequestBySearch>();
  private readonly defaultImg: string;
  private _onDestroy$ = new Subject<void>();

  @Output() selectedMovie = new EventEmitter<Movie>();
  @Output() acceptedMovie = new EventEmitter<boolean>();

  constructor(private _omdbapiService: OmdbapiService,
              private _eventService: EventService,
              private _router: Router,
              private _dataService: DataService,
              public _snackBar: MatSnackBar,
              public _dialog: MatDialog) {

    this.apikeyCtrl = new FormControl('', [Validators.required]);
    this.movieCtrl = new FormControl('', [Validators.required]);
    this.types = [MovieType.movie, MovieType.series, MovieType.episode];
    this.years = MovieSearchComponent.generateYears(1900);
    this.defaultImg = 'https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325';
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
    const apikey = this._eventService.getApikey();
    if (apikey) {
      this.apikeyCtrl.setValue(localStorage.getItem('apikey'));
    }
  }

  private getMovies(): void {
    // this.movies$ = this.searchTerms.pipe(
    this.searchTerms$.pipe(
      takeUntil(this._onDestroy$),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: RequestBySearch) => {
        return this._omdbapiService.findBySearch$(term).pipe(
          take(1),
          tap(_ => this.totalResults = _.totalResults),
          map(_ => _.Search as Movie[])
        );
      })
    ).subscribe(next => this.movies = next, error1 => {
      this.apiKeyInvalid = true;
      this.getMovies(); // restore the term
    });
  }

  saveApikey(): void {
    if (this.apikeyCtrl.valid) {

      this._dataService.getByAlias$(this.apikeyCtrl.value)
        .pipe(take(1))
        .subscribe(
          user => {
            this.processResponse(user);
          },
          error1 => {
            this.addNewKey(this.apikeyCtrl.value);
          });

    }
  }

  private addNewKey(newKey: string): void {
    this._dataService.addNewKey$(newKey)
      .pipe(take(1))
      .subscribe(
        user => {
          this.processResponse(user);
        },
        error => {
          this.openSnackBar('Error!', '', 2000);
        });
  }

  openSnackBar(message: string, action: string, duration: number): void {
    const snackBarRef = this._snackBar.open(message, action, {
      duration: duration
    });

    snackBarRef.onAction()
      .pipe(take(1))
      .subscribe(() => {
        console.log('The snack-bar action was triggered!');
        this.linkAliasToKey();
      });
  }

  private processResponse(user: AppUser): void {
    if (!user.alias || user.apikey === user.alias) {
      this.openSnackBar('Done! You can once link API-key to readable alias and use it instead of the key.', 'LINK ALIAS', 0);
    } else {
      this.openSnackBar('Done!', '', 2000);
    }

    this._eventService.saveApikey(user.apikey);
  }

  linkAliasToKey(): void {
    this._dialog.open(LinkApiKeyToAliasDialogComponent, {
      panelClass: 'common-dialog',
      width: '340px',
      height: '240px',
      data: this.apikeyCtrl.value
    });
  }

  search(): void {
    const req = {
      s: this.movieCtrl.value,
      type: this.type,
      y: this.year,
      page: this.page
    };

    if (this.movieCtrl.valid && this.apikeyCtrl.valid) {
      this.searchTerms$.next(req);
    }
  }

  selectMovie(): void {
    this.selectedMovie.emit(this.movieCtrl.value);
  }

  displayMovie(m: Movie): string {
    return m ? m.Title : null;
  }

  gotoDetails(imdbID: string): void {
    this._router.navigate(['movie/' + imdbID]);
  }

  zoomImg(title: string, src: string): void {
    this._eventService.zoomImg(title, src);
  }

  acceptMovie(): void {
    this._eventService.movie = this.movieCtrl.value;
  }

  imgErrorHandler(event): void {
    event.target.src = this.defaultImg;
  }
}
