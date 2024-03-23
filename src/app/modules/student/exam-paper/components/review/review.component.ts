import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExamPaperService} from "../../service/exam-paper.service";
import {AnswerModel} from "../../service/domain/exam-question.model";
import {QuestionDetailModel} from "../../../../admin/question/edit-question/service/domain/question.model";

export interface ReviewModel {
  answers: AnswerModel[];
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  selectedIndex: number = -1;
  answerDetails: AnswerModel[] = [];

  @Output('onSubmit') onSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private examPaperService: ExamPaperService,
  ) {
  }

  ngOnInit(): void {
    this.examPaperService.answerData$.subscribe(
      {
        next: (reviewData: ReviewModel) => {
          this.answerDetails = reviewData.answers;
        },
        error: err => {
        }
      }
    );
  }

  submit() {
    this.onSubmit.emit()
  }
}
