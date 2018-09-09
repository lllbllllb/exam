import { NgModule } from '@angular/core';
import { AppComponent } from '@exam-app/app.component';
import { CoreModule } from '@exam-core/core.module';
import { SharedModule } from '@exam-shared/shared.module';
import { MovieModule } from '@exam-app/movie/movie.module';
import { AppRoutingModule } from '@exam-app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MovieModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
