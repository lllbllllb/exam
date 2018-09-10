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
    this.defaultImg = 'https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325';
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
