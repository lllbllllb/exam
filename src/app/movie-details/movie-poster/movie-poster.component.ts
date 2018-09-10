import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@exam-app/domain';
import { EventService } from '@exam-core/event.service';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {

  @Input('movie') movie: Movie;

  defaultImg: string;

  constructor(private _eventService: EventService) {
    this.defaultImg = 'https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325';
  }

  ngOnInit() {
  }

  zoomImg(title: string, src: string): void {
    this._eventService.zoomImg(title, src);
  }

  imgErrorHandler(event) {
    event.target.src = this.defaultImg;
  }
}
