import { MovieType } from './movie-type';

/**
 * Both {@link i} and {@link t} are optional at least one argument is required.
 */
export interface RequestById {

  /** A valid IMDb ID (e.g. tt1285016) */
  i?: string;

  /** Movie title to search for. */
  t?: string;

  /** Type of result to return. */
  type?: MovieType;

  /** Year of release. */
  y?: string;

  /**
   *  Return {@options short, full} plot.
   *  Default: short
   */
  plot?: string;

  /**
   * The data type to return. {@options json, xml}
   * Default: json
   */
  r?: string;

  /** JSONP callback name. */
  callback?: string;

  /**
   * API version (reserved for future use).
   * Default: 1
   */
  v?: number;
}
