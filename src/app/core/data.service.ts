import { Injectable } from '@angular/core';
import { EventService } from '@exam-core/event.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppUser } from '@exam-domain/app-user';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _root: string;
  private readonly _search: string;
  private readonly _findByKey: string;
  private readonly _exist: string;

  constructor(private _http: HttpClient,
              private _eventService: EventService) {

    this._root = 'http://localhost:8080/user';
    this._search = '/search';
    this._findByKey = '/findByKey';
    this._exist = '/exist';
  }

  getByAlias$(alias: string): Observable<AppUser> {
    const params = {
      params: new HttpParams()
        .set('key', alias)
    };
    return this._http.get<AppUser>(this._root + this._search + this._findByKey, params)
      .pipe(
        tap(),
        // retry(3),
        catchError(this.handleError)
      );
  }

  isAliasExist$(alias: string): Observable<number> {
    const params = {
      params: new HttpParams()
        .set('key', alias)
    };

    return this._http.get<number>(this._root + this._search + this._exist, params)
      .pipe(
        tap(),
        // retry(3),
        catchError(this.handleError)
      );
  }

  addNewKey$(key: string): Observable<AppUser> {
    return this._http.post<AppUser>(this._root, {'apikey': key})
      .pipe(
        tap(),
        // retry(3),
        catchError(this.handleError)
      );
  }

  patchAppUser$(patch: AppUser): Observable<AppUser> {
    console.log('patch:\n' + JSON.stringify(patch));

    return this._http.patch<AppUser>(patch._links.self.href, this.patchParams(patch))
      .pipe(
        catchError(this.handleError)
      );
  }

  private patchParams(user: AppUser): any {
    const patch = {};

    for (const key of Object.keys(user)) {
      if (user[key] && 'id' !== key) {
        patch[key] = user[key];
      }
    }

    return patch;
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
