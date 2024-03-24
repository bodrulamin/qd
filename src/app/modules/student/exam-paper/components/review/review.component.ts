import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExamPaperService} from "../../service/exam-paper.service";
import {AnswerModel, AnswerQueryModel} from "../../service/domain/exam-question.model";


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  selectedIndex: number = -1;
  answerDetails: AnswerModel[] = [];

  @Output('onSubmit') onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output('onBack') onBack: EventEmitter<any> = new EventEmitter<any>();
  @Input() answerQueryData;
  constructor(
    private examPaperService: ExamPaperService,
  ) {
  }

  ngOnInit(): void {

    this.examPaperService.getAnswerList(this.answerQueryData).subscribe({
      next: apiResponse => {
        this.answerDetails = apiResponse.data;
      }
    });
  }

  submit() {
    this.onSubmit.emit()
  }

  back() {
    this.onBack.emit()

  }
}
