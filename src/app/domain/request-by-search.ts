import { MovieType } from './movie-type';

export interface RequestBySearch {

  /** Movie title to search for. */
  s: string;

  /** Type of result to return. */
  type?: MovieType;

  /** Year of release. */
  y?: string;

  /**
   * The data type to return. {@options json, xml}
   * Default: json
   */
  r?: string;

  /**
   * Page number to return. {@options 1-100}
   * Default: 1
   */
  page?: number;

  /** 	JSONP callback name. */
  callback?: string;

  /**
   * API version (reserved for future use).
   * Default: 1
   */
  v?: number;
}
