import { Injectable } from '@angular/core';
import { ReplaySubject, throwError } from 'rxjs';
import { Movie } from '@exam-app/domain';
import { MatDialog } from '@angular/material';
import { ZoomImageDialogComponent } from '@exam-shared/zoom-image-dialog/zoom-image-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _movies$ = new ReplaySubject<Movie[]>(1);
  private _movies: Movie[] = [];

  constructor(public _dialog: MatDialog) {
    this.restoreFromLS();
  }

  set movie(value: Movie) {
    let has = false;
    this._movies.forEach(i => {
      if (i.imdbID === value.imdbID) {
        has = true;
      }
    });

    if (value && !has) {
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

  zoomImg(title: string, src: string): void {
    this._dialog.open(ZoomImageDialogComponent, {
      panelClass: 'image-dialog',
      maxWidth: '95vw',
      maxHeight: '95vh',
      data: {title, src}
    });
  }

  removeMovie(imdbId: string): void {
    this.movies = this._movies.filter(m => m.imdbID !== imdbId);
  }

  getApikey(): string {
    return localStorage.getItem('apikey');
  }

  saveApikey(apikey: string): void {
    localStorage.setItem('apikey', apikey);
  }

}
