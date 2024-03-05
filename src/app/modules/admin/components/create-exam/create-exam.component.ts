import { Component } from '@angular/core';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent {
  examLevels = [{name: 'Select Exam Level', code: null}];
  sessions = [{name: 'Select Session', code: null}];
  subjects = [{name: 'Select Subject', code: null}];
  years = [{name: 'Select Year', code: null}];
  examDate: any;

}
