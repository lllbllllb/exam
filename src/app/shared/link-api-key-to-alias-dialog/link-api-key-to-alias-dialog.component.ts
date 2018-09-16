import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from '@exam-core/data.service';
import { aliasValidator } from '@exam-app/validators/alias-validator';
import { EventService } from '@exam-core/event.service';
import { AppUser } from '@exam-domain/app-user';

@Component({
  selector: 'app-link-api-key-to-alias-dialog',
  templateUrl: './link-api-key-to-alias-dialog.component.html',
  styleUrls: ['./link-api-key-to-alias-dialog.component.scss']
})
export class LinkApiKeyToAliasDialogComponent implements OnInit {

  apikeyCtrl: FormControl;
  showApikey: boolean;

  aliasCtrl: FormControl;
  showAlias: boolean;

  private user: AppUser;

  constructor(private _dataService: DataService,
              private _eventService: EventService,
              public dialogRef: MatDialogRef<LinkApiKeyToAliasDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {

    this.apikeyCtrl = new FormControl('', [Validators.required]);
    this.aliasCtrl = new FormControl('', [Validators.required], [aliasValidator(this._dataService, this._eventService)]);
  }

  ngOnInit(): void {
    this.apikeyCtrl.setValue(this.data);
    this._dataService.getByAlias$(this.data)
      .subscribe($ => {
        this.user = $;
        console.log('loaded: ' + JSON.stringify($));
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  saveAlias(): void {
    this._dataService.patchAppUser$({id: this.user.id, alias: this.aliasCtrl.value, _links: this.user._links})
      .subscribe($ => {
        console.log('patchrd:\n' + JSON.stringify($));
        this.onClose();
      });
  }

}
