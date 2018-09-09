import { MovieModule } from './movie.module';

describe('MovieModule', () => {
  let movieModule: MovieModule;

  beforeEach(() => {
    movieModule = new MovieModule();
  });

  it('should create an instance', () => {
    expect(movieModule).toBeTruthy();
  });
});
