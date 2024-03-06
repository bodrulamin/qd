import {Component, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {ADMIN_DATA, AuthService} from "../../auth/service/auth.service";
import {menus} from "../menu.model";


@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService, private authService: AuthService) {
    this.generateMenus();
  }

  ngOnInit() {
    // this.model = menusem
  }

  generateMenus() {
    let data = this.authService.getData(ADMIN_DATA);
    if (data && data.modules) {
      this.model = [{label: '', items: data.modules}]
    }
  }
}
