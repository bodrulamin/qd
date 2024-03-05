import { Component } from '@angular/core';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent {
  examLevels = [{name: 'Exam Level', code: null}];
  sessions = [{name: 'Session', code: null}];
  subjects = [{name: 'Subject', code: null}];
  years = [{name: 'Year', code: null}];

}
