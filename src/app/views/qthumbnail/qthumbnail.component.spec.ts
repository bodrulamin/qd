import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QthumbnailComponent } from './qthumbnail.component';

describe('QthumbnailComponent', () => {
  let component: QthumbnailComponent;
  let fixture: ComponentFixture<QthumbnailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QthumbnailComponent]
    });
    fixture = TestBed.createComponent(QthumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
