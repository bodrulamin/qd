import {Routes} from "@angular/router";
import {StudentLoginComponent} from "./login/student-login.component";
import {StudentHomeComponent} from "./home/components/student-home.component";
import {studentAuthGuard} from "../auth/auth-guard/auth.guard";

export const sudentRoutes: Routes = [
  { path: "", component: StudentLoginComponent},
  {path: "home", component: StudentHomeComponent, canActivate: [studentAuthGuard],children:[
      {path: 'instruction', loadChildren: () => import('./exam-paper/exam-paper.module').then(m => m.ExamPaperModule)},
      {path: 'exam-paper', loadChildren: () => import('./exam-paper/exam-paper.module').then(m => m.ExamPaperModule)},
    ] },

]
