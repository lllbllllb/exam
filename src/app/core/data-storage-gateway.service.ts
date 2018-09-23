import { Injectable } from '@angular/core';
import { DataService } from '@exam-core/data.service';
import { StorageService } from '@exam-core/storage.service';
import { Movie } from '@exam-app/domain';

@Injectable({
  providedIn: 'root'
})
export class DataStorageGatewayService {

  constructor(private _data: DataService,
              private _storage: StorageService) {
  }

  getMovies(): Movie[] {

    return null;
  }

  setMovies(movies: Movie[]): void {

  }
}
