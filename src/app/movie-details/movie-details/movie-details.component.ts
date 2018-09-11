import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbapiService } from '@exam-core/omdbapi.service';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { Movie } from '../../domain';
import { EventService } from '@exam-core/event.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;

  constructor(private _omdbapiService: OmdbapiService,
              private _route: ActivatedRoute,
              private _location: Location,
              private _eventService: EventService) {

  }

  ngOnInit() {
    this.getMovie();
  }

  private getMovie() {
    const imdbID = this._route.snapshot.paramMap.get('imdbID');
    const req = {i: imdbID};

    this._omdbapiService.findById$(req)
      .pipe(take(1))
      .subscribe($ => this.movie = $);
  }

  removeMvie(): void {
    this._eventService.removeMovie(this.movie.imdbID);
  }

  goBack(): void {
    this._location.back();
  }

}
