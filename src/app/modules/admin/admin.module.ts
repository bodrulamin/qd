import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {adminRoutes} from "./admin.route";
import {AppLayoutModule} from "./layout/app.layout.module";

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes),
    ],
  declarations: [
  ]
})

export class AdminModule {
}
