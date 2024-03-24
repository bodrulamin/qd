import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserLookupComponent} from "./user-lookup.component";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,

  ],
  exports: [
    UserLookupComponent
  ],
  declarations: [
    UserLookupComponent,
  ]
})
export class UserLookupTemplateModule {
}
