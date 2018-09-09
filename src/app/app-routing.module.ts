import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [

  {
    path: 'movie',
    loadChildren: './movie/movie.module#MovieModule'
  },
  {
    path: 'movie/:imdbID',
    loadChildren: './movie-details/movie-details.module#MovieDetailsModule'
  },
  {
    path: '**',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
