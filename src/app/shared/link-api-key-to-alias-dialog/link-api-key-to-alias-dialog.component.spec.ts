import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkApiKeyToAliasDialogComponent } from './link-api-key-to-alias-dialog.component';

describe('LinkApiKeyToAliasDialogComponent', () => {
  let component: LinkApiKeyToAliasDialogComponent;
  let fixture: ComponentFixture<LinkApiKeyToAliasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkApiKeyToAliasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkApiKeyToAliasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
