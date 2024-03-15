import {Routes} from "@angular/router";
import {StudentLoginComponent} from "./login/student-login.component";
import {InstructionComponent} from "./instruction/components/instruction.component";

export const sudentRoutes: Routes = [
  {path: "", component: StudentLoginComponent},
  {path: 'instruction', component: InstructionComponent},
  {path: 'exam-paper', loadChildren: () => import('./exam-paper/exam-paper.module').then(m => m.ExamPaperModule)},

]

