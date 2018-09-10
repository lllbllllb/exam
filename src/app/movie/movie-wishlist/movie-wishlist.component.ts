import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '@exam-app/domain';
import { EventService } from '@exam-core/event.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';

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

  deletedItemImdbId: string;

  constructor(private _eventService: EventService) {
    this.movies = [];
    this.defaultImg = 'https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325';
  }

  ngOnInit(): void {
    this.getMovies();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();

    this._stopTimer$.next();
    this._stopTimer$.complete();
  }

  private getMovies(): void {
    this._eventService.movies$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe($ => this.movies = $);
  }

  deleteMovie(movie: Movie): void {

    if (movie.imdbID !== this.deletedItemImdbId) {
      this.deletedItemImdbId = movie.imdbID;
    } else {
      this.deletedItemImdbId = '';
    }

    this._stopTimer$.next();

    timer(2000).pipe(
      takeUntil(this._stopTimer$)
    ).subscribe(() => {
      console.log('permanentDelete: ' + movie.imdbID);
      this.permanentDelete(this.deletedItemImdbId);
    });
  }

  private permanentDelete(imdbId: string) {
    this.movies = this.movies.filter(m => m.imdbID !== imdbId);
    this._eventService.movies = this.movies;
    this.deletedItemImdbId = '';
  }

  zoomImg(title: string, src: string): void {
    this._eventService.zoomImg(title, src);
  }

  imgErrorHandler(event) {
    event.target.src = this.defaultImg;
  }

}
