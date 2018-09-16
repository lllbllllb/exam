import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatListModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviePreviewComponent } from '@exam-shared/movie-preview/movie-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { ZoomImageDialogComponent } from './zoom-image-dialog/zoom-image-dialog.component';
import { LinkApiKeyToAliasDialogComponent } from './link-api-key-to-alias-dialog/link-api-key-to-alias-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  declarations: [
    MoviePreviewComponent,
    ZoomImageDialogComponent,
    LinkApiKeyToAliasDialogComponent
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MoviePreviewComponent,
    ZoomImageDialogComponent,
    LinkApiKeyToAliasDialogComponent
  ],
  bootstrap: [
    ZoomImageDialogComponent,
    LinkApiKeyToAliasDialogComponent
  ],

})
export class SharedModule {
}
