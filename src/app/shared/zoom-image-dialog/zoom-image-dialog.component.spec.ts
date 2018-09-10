import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomImageDialogComponent } from './zoom-image-dialog.component';

describe('ZoomImageDialogComponent', () => {
  let component: ZoomImageDialogComponent;
  let fixture: ComponentFixture<ZoomImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
