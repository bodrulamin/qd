import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ADMIN_DATA, AuthService} from "../../../auth/service/auth.service";
import {LoginModel} from "../../../student/service/domain/login.model";
import {BaseComponent} from "../../../base/components/base-component/base.component";

@Component({
  selector: 'app-admin-login',
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
    if (authService.adminAuthenticated()) {
      this.route.navigate(['home'], {relativeTo: this.activatedRoute})
    }
  }

  onLogin(credential: LoginModel) {
    this.subscribers.adminLoginsubs = this.authService.adminLogin(credential.username, credential.password).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.authService.saveData(ADMIN_DATA, apiResponse.data)
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Login Successful !'});
        this.route.navigate(['home'], {relativeTo: this.activatedRoute})
      }
    });

  }

}
