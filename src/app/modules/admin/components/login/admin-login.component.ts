import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../auth/service/auth.service";
import {LoginModel} from "../../../student/service/domain/login.model";
import {BaseComponent} from "../../../base/components/base-component/base.component";

@Component({
  selector: 'app-student-login',
  templateUrl: './admin-login.component.html',
})
export class AdminLoginComponent extends BaseComponent {
  loginHeader = 'Admin Login';

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    super();
  }

  onLogin(credential: LoginModel) {
    this.authService.adminLogin(credential.username, credential.password);
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
