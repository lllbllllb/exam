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
    this.restoreFromLS();
  }

  set movie(value: Movie) {
    if (value && !this._movies.includes(value)) {
      this._movies.push(value);
      this._movies$.next(this._movies);
      this.saveToLS();
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
    this.saveToLS();
  }

  private saveToLS(): void {
    localStorage.setItem('movies', JSON.stringify(this._movies));
  }

  private restoreFromLS(): void {
    const tmp = JSON.parse(localStorage.getItem('movies'));
    if (tmp && tmp.length > 0) {
      this._movies = tmp;
      this._movies$.next(tmp);
    }
  }
}
