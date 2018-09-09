import { Rating } from './rating';
import { MovieType } from './movie-type';

export interface Movie {
  Title: string;
  Year?: number;
  Rated?: string;
  Released?: Date;
  Runtime?: string;
  Genre?: string[];
  Director?: string[];
  Writer?: string[];
  Actors?: string[];
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string[];
  Poster: string;
  Ratings?: Rating[];
  Metascore?: number;
  imdbRating?: number;
  imdbVotes?: number;
  imdbID: string;
  Type?: MovieType;
  DVD?: Date;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: boolean;
}
