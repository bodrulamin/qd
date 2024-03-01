import {NgModule} from '@angular/core';
import {AdminLoginComponent} from './components/admin-login/admin-login.component';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: AdminLoginComponent}
    ])
  ],
  declarations: [AdminLoginComponent]
})
export class AdminModule {
}
