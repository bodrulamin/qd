import { Component } from '@angular/core';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
})
export class StudentLoginComponent {
  loginHeader = 'Student Login';
  constructor() {
  }


  onLogin($event: any) {
    console.log($event)
  }
}
