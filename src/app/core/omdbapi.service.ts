import { Injectable } from '@angular/core';
import { Movie, RequestById, RequestBySearch } from '../domain';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OmdbapiService {

  private readonly serviceUri: string;

  constructor(private _http: HttpClient) {
    this.serviceUri = 'https://www.omdbapi.com/';
  }

  private static requestParamsConstrictor(req: RequestById | RequestBySearch): HttpParams {

    let params = new HttpParams();

    for (const key of Object.keys(req)) { // https://stackoverflow.com/a/45959874/6351976
      if (req[key]) {
        params = params.set(key, req[key]);
      }
    }

    // params = params.set('apikey', '4e968e9c');
    params = params.set('apikey', localStorage.getItem('apikey'));

    return params;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   */
  private static handleError(error: HttpErrorResponse) {
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

  findById$(req: RequestById): Observable<Movie> {
    return this._http.get<Movie>(this.serviceUri, {params: OmdbapiService.requestParamsConstrictor(req)})
      .pipe(
        tap(),
        // retry(3),
        // catchError(OmdbapiService.handleError)
      );
  }

  findBySearch$(req: RequestBySearch): Observable<any> {
    return this._http.get<any>(this.serviceUri, {params: OmdbapiService.requestParamsConstrictor(req)})
      .pipe(
        // retry(3),
        catchError(OmdbapiService.handleError)
      );
  }
}

