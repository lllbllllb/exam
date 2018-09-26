import { Injectable } from '@angular/core';
import { EventService } from '@exam-core/event.service';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppUser } from '@exam-domain/app-user';
import { catchError, map, tap } from 'rxjs/operators';
import { StorageService } from '@exam-core/storage.service';
import { ConfigService } from '@exam-core/config.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly _root: string;
  private readonly _search: string;
  private readonly _findByKey: string;
  private readonly _exist: string;

  constructor(private _http: HttpClient,
              private _storage: StorageService,
              private _configService: ConfigService) {

    this._root = this._configService.getConfiguration().webApiBaseUrl;
    this._search = '/search';
    this._findByKey = '/findByKey';
    this._exist = '/exist';
  }

  private static patchParams(user: AppUser): any {
    const patch = {};

    for (const key of Object.keys(user)) {
      if (user[key] && 'id' !== key && '_links' !== key) {
        patch[key] = user[key];
      }
    }

    return patch;
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else if (error.status === 401) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('Unauthorized.');
    }

    // console.log(error);

    // return an observable with a user-facing error message
    return throwError(error.status);
  }

  getByAlias$(alias: string): Observable<AppUser> {
    const params = {
      params: new HttpParams()
        .set('key', alias)
    };
    return this._http.get<AppUser>(this._root + this._search + this._findByKey, params)
      .pipe(
        // retry(3),
        catchError(DataService.handleError),
        tap(resp => this.saveResponseAsUser(resp))
      );
  }

  addNewKey$(key: string): Observable<AppUser> {
    return this._http.post<AppUser>(this._root, {'apikey': key})
      .pipe(
        // retry(3),
        catchError(DataService.handleError),
        tap(resp => this.saveResponseAsUser(resp))
      );
  }

  patchAppUser$(patch: AppUser): Observable<AppUser> {
    console.log('patch:\n' + JSON.stringify(patch));

    const patchHref = this._storage.getUser()._links.self.href;

    return this._http.patch<AppUser>(patchHref, DataService.patchParams(patch))
      .pipe(
        catchError(DataService.handleError),
        tap(resp => this.saveResponseAsUser(resp))
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
        catchError(DataService.handleError)
      );
  }

  private saveResponseAsUser(resp: any): void {
    if (resp instanceof HttpErrorResponse) {
      console.log('error');
      return;
    }

    this._storage.setUser(resp);
  }
}
