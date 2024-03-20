import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LayoutService} from 'src/app/modules/admin/layout/service/app.layout.service';
import {LoginModel} from "../../../student/service/domain/login.model";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
      transform: scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent extends BaseComponent {

  loginForm: FormGroup;
  @Output() onLoginClicked: EventEmitter<LoginModel> = new EventEmitter<LoginModel>();
  @Input() header: string;
  @Input() usernameTitle: string = 'Username';
  @Input() passwordTitle: string = 'Password';
  private credential: LoginModel = new LoginModel();
  required_field = {};

  constructor(
    public layoutService: LayoutService,
    private formBuilder: FormBuilder,
  ) {
    super();
    this.prepareCreateQuestionForm();
    this.required_field = {
      username: this.usernameTitle,
      password: this.passwordTitle
    };
  }

  private prepareCreateQuestionForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.formInvalid()) return;

    let user = this.loginForm.value;
    this.onLoginClicked.emit(user)
  }

  private formInvalid() {
    this.markFormGroupAsTouched(this.loginForm)
    this.showRequiredErrorMessage(this.loginForm, this.required_field)
    return this.loginForm.invalid;
  }
}
