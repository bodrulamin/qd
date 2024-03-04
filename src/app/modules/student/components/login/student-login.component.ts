import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {AuthService} from "../../../auth/service/auth.service";
import {LoginModel} from "../../service/domain/login.model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
})
export class StudentLoginComponent extends BaseComponent {
  loginHeader = 'Student Login';
  credential = new LoginModel();

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authService:AuthService
  ) {
    super();
  }


  onLogin($event: any) {
    this.authService.studentLogin(this.credential.username,this.credential.password);
    this.subscribers.isAdminLoggedInSubs = this.authService.isAdminLoggedIn$.subscribe(value => {
      if (value) {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Login Successfull!'});
        this.route.navigate(['home'], {relativeTo: this.activatedRoute})
      } else {
        this.messageService.add({severity: 'success', summary: 'Failed', detail: 'Login Failed!'});
      }

    })
  }
}
