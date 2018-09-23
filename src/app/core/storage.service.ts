import { Injectable } from '@angular/core';
import { Movie } from '@exam-app/domain';
import { AppUser } from '@exam-domain/app-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly _APIKEY = 'apikey';
  private readonly _MOVIES = 'movies';
  private readonly _USER = 'user';

  constructor() {
  }

  getUser(): AppUser {
    return JSON.parse(localStorage.getItem(this._USER));
  }

  setUser(user: AppUser): void {
    localStorage.setItem(this._USER, JSON.stringify(user));
  }

  getMovies(): Movie[] {
    return JSON.parse(localStorage.getItem(this._MOVIES)) as Movie[];
  }

  setMovies(movies: Movie[]): void {
    localStorage.setItem(this._MOVIES, JSON.stringify(movies));
  }

  isUser(): boolean {
    return !!localStorage.getItem(this._USER);
  }
}
