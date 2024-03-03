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
import { EditQuestionComponent } from './components/question/edit-question/edit-question.component';
import {SplitterModule} from "primeng/splitter";
import {EditorModule} from "primeng/editor";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes),
    CommonModule,
    InputTextModule,
    AppLayoutModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    MenuModule,
    SplitterModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    ScrollPanelModule,
    ConfirmDialogModule,
    ToastModule,

  ],
  declarations: [
    CreateQuestionComponent,
    EditQuestionComponent
  ]
})
export class AdminModule {
}
