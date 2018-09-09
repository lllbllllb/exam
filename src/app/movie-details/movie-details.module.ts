import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviePosterComponent } from './movie-poster/movie-poster.component';
import { MovieDescriptionComponent } from './movie-description/movie-description.component';

const routes: Routes = [
  {
    path: '',
    component: MovieDetailsComponent,
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
    MovieDetailsComponent,
    MoviePosterComponent,
    MovieDescriptionComponent
  ]
})
export class MovieDetailsModule {
}
