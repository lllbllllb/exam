import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '@exam-app/domain';
import { EventService } from '@exam-core/event.service';
import { take, takeUntil } from 'rxjs/operators';
import { Observable, Subject, timer } from 'rxjs';
import { StorageService } from '@exam-core/storage.service';
import { DataService } from '@exam-core/data.service';
import { AppUser } from '@exam-domain/app-user';
import { OmdbapiService } from '@exam-core/omdbapi.service';
import { ConfigService } from '@exam-core/config.service';

@Component({
  selector: 'app-movie-wishlist',
  templateUrl: './movie-wishlist.component.html',
  styleUrls: ['./movie-wishlist.component.scss']
})
export class MovieWishlistComponent implements OnInit, OnDestroy {

  movies: Movie[];
  private readonly defaultImg: string;

  private _onDestroy$ = new Subject<void>();
  private _stopTimer$ = new Subject<void>();

  delTargetMovie: Movie;

  constructor(private _eventService: EventService,
              private _storage: StorageService,
              private _data: DataService,
              private _omdbApi: OmdbapiService,
              private _configService: ConfigService) {

    this.movies = [];
    this.defaultImg = this._configService.getConfiguration().avatarDefaultUrl;
  }

  private static splitSingleToArray(single: string): string[] {
    // console.log(`For split: ${single}`);

    if (!single) {
      return null;
    }

    const splitted = single.split(',').filter(m => m !== '');

    // console.log(`Splitted: ${JSON.stringify(splitted)}`);

    return splitted;
  }

  private static convertMoviesArrayToString(movies: Movie[]): string {
    // console.log(JSON.stringify(movies));

    let tmp = '';

    for (const m of movies) {
      tmp += `${m.imdbID ? m.imdbID : ''},`;
    }

    // console.log(tmp);
    return tmp;
  }

  ngOnInit(): void {
    this.loadMoviesIfUserExist(true);
    this.newMovieListener();
    this.newUserListener();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();

    this._stopTimer$.next();
    this._stopTimer$.complete();
  }

  preDeleteMovie(movie: Movie): void {
    this.delTargetMovie = movie;
  }

  okDeleteMovie(movie: Movie): void {
    this.removeMovieFromArray(movie);
  }

  undoDeleteMovie(): void {
    this.delTargetMovie = null;
  }

  private loadMoviesIfUserExist(clearCurrentMovies?: boolean): void {
    // console.log('loadMoviesIfUserExist: ' + this._storage.isUser());

    if (this._storage.isUser()) {
      this.loadMovies(MovieWishlistComponent.splitSingleToArray(this._storage.getUser().movies), clearCurrentMovies);
    }
  }

  private loadMovies(imdbIDs: string[], clearCurrentMovies?: boolean): void {
    if (!imdbIDs) {
      return;
    }

    if (clearCurrentMovies) {
      this.movies = [];
    }

    for (const i of imdbIDs) {
      this.getMovie(i)
        .pipe(take(1))
        .subscribe(movie => this.movies.push(movie),
          error1 => console.log(`Error with getting movie ${i}.\n ${error1}`));
    }
  }

  private getMovie(imdbID: string): Observable<Movie> {
    const req = {i: imdbID};

    return this._omdbApi.findById$(req);
  }

  private newUserListener(): void {
    this._eventService.newUser$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(user => this.loadMoviesIfUserExist(true));
  }

  private newMovieListener(): void {
    this._eventService.movie$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(movie => {
        if (!this.isMovieAlreadyInArray(movie)) {
          this.addMovieToArray(movie);
        }
      });
  }

  private isMovieAlreadyInArray(movie: Movie): boolean {
    return this.movies && this.movies.map(m => m.imdbID).includes(movie.imdbID);
  }

  private addMovieToArray(movie: Movie): void {
    const backup = new MoviesBackup(this.movies);
    this.movies.push(movie);
    this.saveCurrentMoviesToUserAccount(backup);
  }

  private removeMovieFromArray(movie: Movie): void {
    const backup = new MoviesBackup(this.movies);
    this.movies = this.movies.filter(m => m.imdbID !== movie.imdbID);
    this.saveCurrentMoviesToUserAccount(backup);
  }

  private saveCurrentMoviesToUserAccount(backup: MoviesBackup): void {
    if (this._storage.isUser() && this.movies) {
      const user = {'movies': MovieWishlistComponent.convertMoviesArrayToString(this.movies)};
      this._data.patchAppUser$(user)
        .pipe()
        .subscribe(response => {
            // console.log(response);
          },
          error1 => { // remove movie from list if error
            this.movies = backup.restoreMovies;
          });
    }
  }

  // --- img processor

  zoomImg(title: string, src: string): void {
    this._eventService.zoomImg(title, src);
  }

  imgErrorHandler(event) {
    event.target.src = this.defaultImg;
  }

}

export class MoviesBackup {

  private readonly _restoreMovies: Movie[];

  constructor(currentMovies: Movie[]) {
    this._restoreMovies = currentMovies;
  }

  get restoreMovies(): Movie[] {
    return this._restoreMovies;
  }
}
