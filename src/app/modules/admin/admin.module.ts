import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {adminRoutes} from "./admin.route";
import {InputTextModule} from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {AppLayoutModule} from "./layout/app.layout.module";
import { CreateQuestionComponent } from './components/question/create-question/create-question.component';
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {MenuModule} from "primeng/menu";
import {SpeedDialModule} from "primeng/speeddial";
import {MenubarModule} from "primeng/menubar";
import {SplitButtonModule} from "primeng/splitbutton";

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes),
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    AppLayoutModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    MenuModule,
    SpeedDialModule,
    MenubarModule,
    SplitButtonModule
  ],
  declarations: [
    CreateQuestionComponent
  ]
})
export class AdminModule {
}
