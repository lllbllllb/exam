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
    this.defaultImg = 'https://vignette.wikia.nocookie.net/max-steel-reboot/images/7/72/No_Image_Available.gif/revision/latest?cb=20130902173013';
  }

  ngOnInit() {
  }

  imgErrorHandler(event) {
    event.target.src = this.defaultImg;
  }
}
