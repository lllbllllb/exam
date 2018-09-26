import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@exam-app/domain';
import { EventService } from '@exam-core/event.service';
import { StorageService } from '@exam-core/storage.service';
import { ConfigService } from '@exam-core/config.service';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {

  @Input('movie') movie: Movie;

  defaultImg: string;

  constructor(private _eventService: EventService,
              private _configService: ConfigService) {

    this.defaultImg = this._configService.getConfiguration().avatarDefaultUrl;
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
