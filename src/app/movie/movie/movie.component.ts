import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '@exam-app/domain';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  selectedMovie: Movie;
  acepted: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  selectMovie(e): void {
    this.selectedMovie = e;
  }

  acceptMowie(e): void {
    this.acepted = e;
  }

}
