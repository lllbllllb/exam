import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from '@exam-app/movie/movie/movie.component';
import { SharedModule } from '@exam-shared/shared.module';

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
    MovieComponent
  ]
})
export class MovieModule {
}
