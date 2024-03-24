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
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
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
        path: "question-creator",
        loadChildren: () => import('./question-creator/question-creator.module').then(m => m.QuestionCreatorModule)
      },
      {
        path: "edit-question",
        loadChildren: () => import('./question/edit-question/edit-question.module').then(m => m.EditQuestionModule)
      },
      {
        path: "exam-scheduling",
        loadChildren: () => import('./exam-scheduling/exam-scheduling.module').then(m => m.ExamSchedulingModule)
      },
      {
        path: "lock-question",
        loadChildren: () => import('./lock-question/lock-question.module').then(m => m.LockQuestionModule)
      },
      {
        path: "unlock-question",
        loadChildren: () => import('./unlock-question/unlock-question.module').then(m => m.UnlockQuestionModule)
      },
    ],
  },

]
