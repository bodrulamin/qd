import { Component } from '@angular/core';
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {AuthService} from "../../../auth/service/auth.service";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent extends BaseComponent{
constructor(private authService:AuthService) {
  super();
}

  logout() {
   this.authService.studentLogout()
  }
}
