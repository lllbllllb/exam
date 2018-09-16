import { Injectable } from '@angular/core';
import { EventService } from '@exam-core/event.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppUser } from '@exam-domain/app-user';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _root: string;
  private readonly _search: string;

  constructor(private _http: HttpClient,
              private _eventService: EventService) {

    this._root = 'http://localhost:8080/user';
    this._search = '/search';
  }

  addNewKey(key: string): Observable<AppUser> {
    return this._http.post<AppUser>(this._root, {'apikey': key})
      .pipe(
        tap(),
        // retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else if (error.status === 401) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('Unauthorized.');
    }

    console.log(error);

    // return an observable with a user-facing error message
    return throwError(error.status);
  }
}
