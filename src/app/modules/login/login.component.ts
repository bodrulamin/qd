import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LayoutService} from 'src/app/modules/admin/layout/service/app.layout.service';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginModel} from "../student/service/domain/login.model";

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
export class LoginComponent {

  valCheck: string[] = ['remember'];

  password: string = '';
  @Output() onLoginClicked: EventEmitter<any> = new EventEmitter();
  @Input() header: string = '';
  private credential: LoginModel = new LoginModel();
  username = '';

  constructor(public layoutService: LayoutService, private route: Router, private activatedRoute: ActivatedRoute) {
  }

  login($event: MouseEvent) {
    this.credential.username = this.username;
    this.credential.password = this.password;
    this.onLoginClicked.emit(this.credential)
    // this.route.navigate(['home'], {relativeTo: this.activatedRoute});
  }
}
