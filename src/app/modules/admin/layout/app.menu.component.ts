import {Component, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';
import {ADMIN_DATA, AuthService} from "../../auth/service/auth.service";


@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];
  private customMenu = {
    label: 'Schedule', icon: 'far fa-calendar-days', items: [
      {label: 'Exam Schedule', icon: 'far fa-calendar-days', routerLink: ['schedule-exam']},
    ]
  };

  constructor(public layoutService: LayoutService, private authService: AuthService) {
    this.generateMenus();
  }

  ngOnInit() {
    // this.model = menusem
  }

  generateMenus() {
    let data = this.authService.getData(ADMIN_DATA);
    if (data && data.modules) {
      data.modules.push(this.customMenu)
      this.model = [{label: '', items: data.modules}]
    }
  }
}
