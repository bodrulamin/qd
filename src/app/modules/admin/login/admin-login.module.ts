import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AdminLoginComponent} from "./components/admin-login.component";
import {adminLoginRoute} from "./admin-login.route";
import {AuthModule} from "../../auth/auth.module";

@NgModule({
  imports: [
    RouterModule.forChild(adminLoginRoute),
    AuthModule,
  ],
  declarations: [
    AdminLoginComponent,
  ]

})
export class AdminLoginModule {
}
