import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbapiService } from '@exam-core/omdbapi.service';
import { Location } from '@angular/common';
import { take, takeUntil } from 'rxjs/operators';
import { Movie } from '../../domain';
import { EventService } from '@exam-core/event.service';
import { Subject, timer } from 'rxjs';
import { MoviesBackup } from '@exam-app/movie/movie-wishlist/movie-wishlist.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movie: Movie;
  private _stopTimer$ = new Subject<void>();

  constructor(private _omdbapiService: OmdbapiService,
              private _route: ActivatedRoute,
              private _location: Location,
              private _eventService: EventService) {

  }

  ngOnInit() {
    this.getMovie();
  }

  ngOnDestroy(): void {
    this._stopTimer$.next();
    this._stopTimer$.complete();
  }

  private getMovie() {
    const imdbID = this._route.snapshot.paramMap.get('imdbID');
    const req = {i: imdbID};

    this._omdbapiService.findById$(req)
      .pipe(take(1))
      .subscribe($ => this.movie = $);
  }

  removeMvie(): void {
    // this._eventService.removeMovie(this.movie.imdbID);
  }

  // deleteMovie(movie: Movie): void {
  //
  //   if (movie.imdbID !== this.deletedItemImdbId) {
  //     this.deletedItemImdbId = movie.imdbID;
  //   } else {
  //     this.deletedItemImdbId = '';
  //   }
  //
  //   this._stopTimer$.next();
  //
  //   timer(2000).pipe(
  //     takeUntil(this._stopTimer$)
  //   ).subscribe(() => {
  //     this.removeMovieFromArray(movie);
  //     this.deletedItemImdbId = '';
  //   });
  // }

  // private removeMovieAndSave(movie: Movie): void {
  //   const backup = new MoviesBackup(this.movies);
  //   this.movies = this.movies.filter(m => m.imdbID !== movie.imdbID);
  //   this.saveCurrentMoviesToUserAccount(backup);
  // }
  //
  // private saveCurrentMoviesToUserAccount(backup: MoviesBackup): void {
  //   if (this._storage.isUser() && this.movies) {
  //     const user = {'movies': MovieWishlistComponent.convertMoviesArrayToString(this.movies)};
  //     this._data.patchAppUser$(user)
  //       .pipe()
  //       .subscribe(response => {
  //           // console.log(response);
  //         },
  //         error1 => { // remove movie from list if error
  //           this.movies = backup.restoreMovies;
  //         });
  //   }
  // }

  goBack(): void {
    this._location.back();
  }

}
