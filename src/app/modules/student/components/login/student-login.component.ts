import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../base/components/base-component/base.component";

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
})
export class StudentLoginComponent extends BaseComponent {
  loginHeader = 'Student Login';

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }


  onLogin($event: any) {
    this.route.navigate(['home'], {relativeTo: this.activatedRoute})
    console.log($event)
  }
}
