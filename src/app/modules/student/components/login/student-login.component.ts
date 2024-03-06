import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {ADMIN_DATA, AuthService, STUDENT_DATA} from "../../../auth/service/auth.service";
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
    private authService: AuthService
  ) {
    super();
  }

  onLogin(credential: LoginModel) {
    this.authService.studentLogin(credential.username, credential.password).subscribe(apiResponse => {
      if (apiResponse.result) {
        this.authService.saveData(STUDENT_DATA, apiResponse.data)
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Login Successful !'});
        this.route.navigate(['home'], {relativeTo: this.activatedRoute})
      }
    });

  }
}
