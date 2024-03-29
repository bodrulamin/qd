import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LockUnlockComponent} from "./lock-unlock.component";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {DialogModule} from "primeng/dialog";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        DropdownModule,
        ButtonModule,
        TableModule,
        CalendarModule,
        InputTextModule,
        PasswordModule,
        DialogModule,
        TooltipModule
    ],
  exports: [
    LockUnlockComponent
  ],
  declarations: [
    LockUnlockComponent,
  ]
})
export class LockUnlockTemplateModule {
}
