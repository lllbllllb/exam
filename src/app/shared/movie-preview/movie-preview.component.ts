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
    this.defaultImg = 'https://vignette.wikia.nocookie.net/max-steel-reboot/images/7/72/No_Image_Available.gif/revision/latest?cb=20130902173013';
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
