import {Component} from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {Router} from "@angular/router";
import {InstuctionService} from "../service/instruction.service";
import {ExamInfo, ExamQuestionModel} from "../../exam-paper/service/domain/exam-question.model";



export interface StartExam {
  enrollmentId: number;
  quesId: number;
  studentId: number;
  quizPassword: string
}

@Component({
  selector: 'app-student-home',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent extends BaseComponent {

  examInfo: ExamInfo
  quizPassword: string;
  showQuizPasswordInputDialog: boolean;

  constructor(private router: Router, private instuctionService: InstuctionService) {
    super();
    if (!history.state){
      this.router.navigate(['']);
      console.log('state empty')
    }
    this.examInfo = history.state;
  }


  startExam() {
    if (!this.quizPassword) {
      return;
    }
    let startExamModel: StartExam = {
      quesId: this.examInfo.quesId,
      quizPassword: this.quizPassword,
      studentId: this.examInfo.studentId,
      enrollmentId: this.examInfo.enrollmentId

    };

    this.instuctionService.startExam(startExamModel).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.router.navigate(['exam-paper'],{state:apiResponse.data})
      }

    });

    this.showQuizPasswordInputDialog = false;
    this.quizPassword = '';

  }


  logout() {
    this.router.navigate([""]);
  }
}
