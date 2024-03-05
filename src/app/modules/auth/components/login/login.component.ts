import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LayoutService} from 'src/app/modules/admin/layout/service/app.layout.service';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginModel} from "../../../student/service/domain/login.model";
import {BaseComponent} from "../../../base/components/base-component/base.component";
import {AuthService} from "../../service/auth.service";

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

  valCheck: string[] = ['remember'];

  password: string = '';
  @Output() onLoginClicked: EventEmitter<LoginModel> = new EventEmitter<LoginModel>();
  @Input() header: string;
  private credential: LoginModel = new LoginModel();
  username = '';

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute) {

    super();
  }


  login($event: MouseEvent) {
    this.credential.username = this.username;
    this.credential.password = this.password;
    this.onLoginClicked.emit(this.credential)
  }
}
