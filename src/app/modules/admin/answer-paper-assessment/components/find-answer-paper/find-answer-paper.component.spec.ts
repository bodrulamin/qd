import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAnswerPaperComponent } from './find-answer-paper.component';

describe('FindAnswerPaperComponent', () => {
  let component: FindAnswerPaperComponent;
  let fixture: ComponentFixture<FindAnswerPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindAnswerPaperComponent]
    });
    fixture = TestBed.createComponent(FindAnswerPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
