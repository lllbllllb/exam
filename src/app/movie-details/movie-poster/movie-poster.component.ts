import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@exam-app/domain';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {

  @Input('movie') movie: Movie;

  defaultImg: string;

  constructor() {
    this.defaultImg = 'https://st3.depositphotos.com/10544526/18940/v/1600/depositphotos_189407882-stock-illustration-skull-pirate-jolly-roger-skull.jpg';
  }

  ngOnInit() {
  }

  imgErrorHandler(event) {
    event.target.src = this.defaultImg;
  }
}
