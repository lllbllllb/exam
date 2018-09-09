import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '@exam-app/domain';
import { EventService } from '@exam-core/event.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-movie-wishlist',
  templateUrl: './movie-wishlist.component.html',
  styleUrls: ['./movie-wishlist.component.scss']
})
export class MovieWishlistComponent implements OnInit, OnDestroy {

  movies: Movie[];
  private defaultImg: string;

  private _onDestroy$ = new Subject<void>();

  constructor(private _eventService: EventService) {
    this.movies = [];
    this.defaultImg = 'https://st3.depositphotos.com/10544526/18940/v/1600/depositphotos_189407882-stock-illustration-skull-pirate-jolly-roger-skull.jpg';
  }

  ngOnInit(): void {
    this.getMovies();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }


  private getMovies(): void {
    this._eventService.movies$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe($ => this.movies = $);
  }

  deleteMovie(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this._eventService.movies = this.movies;
  }

  imgErrorHandler(event) {
    event.target.src = this.defaultImg;
  }

}
