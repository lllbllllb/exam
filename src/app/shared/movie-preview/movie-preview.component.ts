import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Movie } from '@exam-app/domain';
import { EventService } from '@exam-core/event.service';
import { ConfigService } from '@exam-core/config.service';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.scss']
})
export class MoviePreviewComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedMovie: Movie;

  defaultImg: string;

  constructor(private _configService: ConfigService) {

    this.defaultImg = this._configService.getConfiguration().avatarDefaultUrl;
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
