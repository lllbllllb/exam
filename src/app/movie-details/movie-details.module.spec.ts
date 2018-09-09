import { MovieDetailsModule } from './movie-details.module';

describe('MovieDetailsModule', () => {
  let movieDetailsModule: MovieDetailsModule;

  beforeEach(() => {
    movieDetailsModule = new MovieDetailsModule();
  });

  it('should create an instance', () => {
    expect(movieDetailsModule).toBeTruthy();
  });
});
