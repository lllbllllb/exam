import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Movie } from '@exam-app/domain';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedMovie: Movie;

  defaultImg: string;

  constructor() {
    this.defaultImg = 'https://st3.depositphotos.com/10544526/18940/v/1600/depositphotos_189407882-stock-illustration-skull-pirate-jolly-roger-skull.jpg';
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.selectedMovie) {
    //
    //   const req = {
    //     i: stringify(this.selectedMovie['imdbID'])
    //   };
    //
    // }
  }

  imgErrorHandler(event) {
    event.target.src = this.defaultImg;
  }
}
