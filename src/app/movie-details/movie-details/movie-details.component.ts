import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbapiService } from '@exam-core/omdbapi.service';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { Movie } from '../../domain';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;

  constructor(private _omdbapiService: OmdbapiService,
              private _route: ActivatedRoute,
              private _location: Location) {

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

  goBack(): void {
    this._location.back();
  }

}
