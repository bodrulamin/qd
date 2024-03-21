import {Component, OnInit} from '@angular/core';
import {ExamPaperService} from "../../service/exam-paper.service";
import {AnswerModel} from "../../service/domain/exam-question.model";
import {QuestionDetailModel} from "../../../../admin/question/edit-question/service/domain/question.model";

export interface ReviewModel {
  questions: QuestionDetailModel[];
  answers: AnswerModel[];
  thumbnailBlobMap: Map<any,any>;
  pdfBlobMap: Map<any,any>;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  selectedIndex:number = -1;
  answerDetails: AnswerModel[] = [];
  answer: AnswerModel = new AnswerModel();
  questionSelected: boolean;
  questionDetail: QuestionDetailModel = new QuestionDetailModel();
  questionDetails: QuestionDetailModel[] = [];
  thumbnailBlobMap: Map<any, any> = new Map();
  pdfBlobMap: Map<any,any> = new Map();
  constructor(
    private examPaperService: ExamPaperService,
  ) {
  }

  ngOnInit(): void {
    this.examPaperService.answerData$.subscribe(
      {
        next: (reviewData:ReviewModel) => {
          this.answerDetails = reviewData.answers;
          this.questionDetails = reviewData.questions;
          this.thumbnailBlobMap = reviewData.thumbnailBlobMap;
          this.pdfBlobMap = reviewData.pdfBlobMap;
        },
        error: err => {
        }
      }
    );
  }

  selectQuestion(i) {
    this.answerDetails[this.selectedIndex] = this.answer;
    this.questionSelected = true;
    this.selectedIndex = i;
    this.questionDetail = this.questionDetails[i];
    this.answer = this.answerDetails[i] || new AnswerModel();
  }
}
