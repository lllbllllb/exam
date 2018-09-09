import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Movie } from '@exam-app/domain';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _movies$ = new ReplaySubject<Movie[]>(1);
  private _movies: Movie[] = [];

  constructor() {
  }

  set movie(value: Movie) {
    if (value && !this._movies.includes(value)) {
      this._movies.push(value);
      this._movies$.next(this._movies);
    }
  }

  get movies$(): ReplaySubject<Movie[]> {
    return this._movies$;
  }

  set movies$(value: ReplaySubject<Movie[]>) {
    this._movies$ = value;
  }

  set movies(value: Movie[]) {
    this._movies = value;
    this._movies$.next(value);
  }
}
