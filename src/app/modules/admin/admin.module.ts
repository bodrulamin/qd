import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {adminRoutes} from "./admin.route";
import {InputTextModule} from "primeng/inputtext";
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
import {AdminLoginComponent} from "./components/login/admin-login.component";
import {AuthModule} from "../auth/auth.module";
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import {CalendarModule} from "primeng/calendar";
import {PasswordModule} from "primeng/password";

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
        AuthModule,
        CalendarModule,
        PasswordModule,


    ],
  declarations: [
    AdminLoginComponent,
    CreateQuestionComponent,
    EditQuestionComponent,
    CreateExamComponent
  ]
})
export class AdminModule {
}
