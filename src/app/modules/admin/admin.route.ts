import {Routes} from "@angular/router";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {CreateQuestionComponent} from "./question/create-question/create-question.component";
import {EditQuestionComponent} from "./question/edit-question/edit-question.component";
import {adminAuthGuard} from "../auth/auth-guard/auth.guard";
import {AdminLoginComponent} from "./login/admin-login.component";
import {ExamConfigurationComponent} from "./exam-configuration/exam-configuration.component";
import {SubjectConfigurationComponent} from "./subject-configuration/subject-configuration.component";

export const adminRoutes: Routes = [
  {
    path: "", component: AdminLoginComponent,
  },
  {
    path: "home", canActivate: [adminAuthGuard], component: AppLayoutComponent, children: [
      {path: "exam-configuration", component: ExamConfigurationComponent},
      {path: "subject-configuration", component: SubjectConfigurationComponent},
      {path: "create-question", component: CreateQuestionComponent},
      {path: "edit-question", component: EditQuestionComponent}
    ],
  },

]
