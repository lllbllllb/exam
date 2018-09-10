import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-zoom-image-dialog',
  templateUrl: './zoom-image-dialog.component.html',
  styleUrls: ['./zoom-image-dialog.component.scss']
})
export class ZoomImageDialogComponent {

  private readonly defaultImg: string;

  constructor(
    public dialogRef: MatDialogRef<ZoomImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.defaultImg = 'https://vignette.wikia.nocookie.net/citrus/images/6/60/No_Image_Available.png/revision/latest?cb=20170129011325';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  imgErrorHandler(event): void {
    event.target.src = this.defaultImg;
  }
}

export interface DialogData {
  title: string;
  src: string;
}
