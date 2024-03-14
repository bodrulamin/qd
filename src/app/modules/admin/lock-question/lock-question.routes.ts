import {Routes} from "@angular/router";
import {LockUnlockComponent} from "../lock-unlock-template/lock-unlock.component";
import {LockQuestionComponent} from "./components/lock-question.component";


export const lockQuestionRoutes: Routes = [
  {
    path: "", component: LockQuestionComponent,
  },

]
