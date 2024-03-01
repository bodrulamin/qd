import {NgModule} from '@angular/core';
import {AdminLoginComponent} from './components/admin-login/admin-login.component';
import {RouterModule} from "@angular/router";
import {adminRoutes} from "./admin.route";
import {InputTextModule} from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes),
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
  ],
  declarations: [AdminLoginComponent]
})
export class AdminModule {
}
