import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Movie, Rating } from '../../domain';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})
export class MovieDescriptionComponent implements OnInit, OnChanges {

  @Input('movie') movie: Movie;
  descriptions: Description[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (this.movie) {
      this.getDescription();
    }
  }

  private getDescription(): void {
    for (const key of Object.keys(this.movie)) { // https://stackoverflow.com/a/45959874/6351976
      if (this.movie[key] && 'Poster' !== key) {
        if ('Ratings' !== key) {
          this.descriptions.push({property: key, value: this.movie[key]});
        } else {
          let val = '';
          for (const prop of Object.keys(this.movie[key])) {
            const ratings = this.movie[key][prop] as Rating;
            val += `${ratings.Source}: ${ratings.Value}; `;
          }

          this.descriptions.push({property: key, value: val});
        }
      }
    }
  }
}

interface Description {
  property: string;
  value: string;
}
