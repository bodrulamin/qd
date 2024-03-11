import {Routes} from "@angular/router";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {adminAuthGuard} from "../auth/auth-guard/auth.guard";

export const adminRoutes: Routes = [
  {
    path: "",
    loadChildren: () => import('./login/admin-login.module').then(m => m.AdminLoginModule)
  },
  {
    path: "home", canActivate: [adminAuthGuard], component: AppLayoutComponent, children: [
      {
        path: 'exam-configuration',
        loadChildren: () => import('./exam-configuration/exam-config.module').then(m => m.ExamConfigModule)
      },
      {
        path: "subject-configuration",
        loadChildren: () => import('./subject-configuration/subject-config.module').then(m => m.SubjectConfigModule)
      },
      {
        path: "create-question",
        loadChildren: () => import('./question/create-question/create-question.module').then(m => m.CreateQuestionModule)
      },
      {
        path: "edit-question",
        loadChildren: () => import('./question/edit-question/edit-question.module').then(m => m.EditQuestionModule)
      },
      {
        path: "schedule-exam",
        loadChildren: () => import('./schedule/schedule-exam.module').then(m => m.ScheduleExamModule)
      },
    ],
  },

]
