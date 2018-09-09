import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from '@exam-app/movie/movie/movie.component';
import { SharedModule } from '@exam-shared/shared.module';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieWishlistComponent } from './movie-wishlist/movie-wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MovieComponent,
    MovieSearchComponent,
    MovieWishlistComponent
  ]
})
export class MovieModule {
}
