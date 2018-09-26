import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventService } from '@exam-core/event.service';
import { ConfigService } from '@exam-core/config.service';

@Component({
  selector: 'app-zoom-image-dialog',
  templateUrl: './zoom-image-dialog.component.html',
  styleUrls: ['./zoom-image-dialog.component.scss']
})
export class ZoomImageDialogComponent {

  private readonly defaultImg: string;

  constructor(private _configService: ConfigService,
    public dialogRef: MatDialogRef<ZoomImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.defaultImg = this._configService.getConfiguration().avatarDefaultUrl;
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
