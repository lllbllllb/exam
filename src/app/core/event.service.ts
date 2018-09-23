import { Injectable } from '@angular/core';
import { ReplaySubject, throwError } from 'rxjs';
import { Movie } from '@exam-app/domain';
import { MatDialog } from '@angular/material';
import { ZoomImageDialogComponent } from '@exam-shared/zoom-image-dialog/zoom-image-dialog.component';
import { AppUser } from '@exam-domain/app-user';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _movie$ = new ReplaySubject<Movie>(1);
  private _newUser$ = new ReplaySubject<AppUser>(1);

  constructor(public _dialog: MatDialog) {
    // this.restoreFromLS();
  }


  get movie$(): ReplaySubject<Movie> {
    return this._movie$;
  }

  set movie$(value: ReplaySubject<Movie>) {
    this._movie$ = value;
  }

  get newUser$(): ReplaySubject<AppUser> {
    return this._newUser$;
  }

  set newUser$(value: ReplaySubject<AppUser>) {
    this._newUser$ = value;
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
    // this.movies = this._movies.filter(m => m.imdbID !== imdbId);
  }

}
