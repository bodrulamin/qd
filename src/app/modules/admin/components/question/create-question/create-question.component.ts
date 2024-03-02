import {Component} from '@angular/core';
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent {
  examLevels = [{name: 'Exam Level', code: null}];
  sessions = [{name: 'Session', code: null}];
  subjects = [{name: 'Subject', code: null}];
  years = [{name: 'Year', code: null}];
  questions: any = [
    {
      code: '101',
      session: '2021-2022',
      status: 'DRAFT'
    }, {
      code: '101',
      session: '2021-2022',
      status: 'DRAFT'
    }, {
      code: '101',
      session: '2021-2022',
      status: 'DRAFT'
    }, {
      code: '101',
      session: '2021-2022',
      status: 'DRAFT'
    }, {
      code: '101',
      session: '2021-2022',
      status: 'DRAFT'
    }, {
      code: '101',
      session: '2021-2022',
      status: 'DRAFT'
    },
  ]
  ;
  actionMenus = [
    {
      label: 'Edit',
      icon: 'pi pi-file-edit',
      command: () => {
      }
    },
    {
      label: 'Approve',
      icon: 'pi pi-verified',
      command: () => {
      }
    },

  ];

}
