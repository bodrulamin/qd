import {Component} from '@angular/core';
import {ADMIN_DATA, AuthService} from "../../../auth/service/auth.service";
import {UserData} from "../../../auth/service/domain/user_data.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  adminData:UserData = new UserData();

  constructor(private authService: AuthService) {
    this.adminData = authService.getData(ADMIN_DATA)
  }
}
