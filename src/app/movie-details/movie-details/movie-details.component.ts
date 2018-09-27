import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbapiService } from '@exam-core/omdbapi.service';
import { Location } from '@angular/common';
import { take, takeUntil } from 'rxjs/operators';
import { Movie } from '../../domain';
import { EventService } from '@exam-core/event.service';
import { Subject, timer } from 'rxjs';
import { MoviesBackup } from '@exam-app/movie/movie-wishlist/movie-wishlist.component';
import { StorageService } from '@exam-core/storage.service';
import { DataService } from '@exam-core/data.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movie: Movie;
  preDelMovie: boolean;
  private _stopTimer$ = new Subject<void>();

  constructor(private _omdbapiService: OmdbapiService,
              private _route: ActivatedRoute,
              private _location: Location,
              private _storage: StorageService,
              private _data: DataService) {

  }

  ngOnInit() {
    this.getMovie();
  }

  ngOnDestroy(): void {
    this._stopTimer$.next();
    this._stopTimer$.complete();
  }

  private getMovie() {
    const imdbID = this._route.snapshot.paramMap.get('imdbID');
    const req = {i: imdbID};

    this._omdbapiService.findById$(req)
      .pipe(take(1))
      .subscribe($ => this.movie = $);
  }

  private removeMovie(): void {
    const backup = this._storage.getUser().movies;
    const temp = backup.replace(`${this.movie.imdbID},`, '');
    this.saveCurrentMoviesToUserAccount(temp);
  }

  private saveCurrentMoviesToUserAccount(newMovies: string): void {
    if (this._storage.isUser()) {
      const user = {'movies': newMovies};
      this._data.patchAppUser$(user)
        .pipe()
        .subscribe(response => {
            // console.log(response);
            this.goBack();
          },
          error1 => { // remove movie from list if error
            this.preDelMovie = false;
            console.log('Error while delete');
          });
    }
  }

  goBack(): void {
    this._location.back();
  }

}
