import {Routes} from "@angular/router";
import {StudentLoginComponent} from "./components/login/student-login.component";
import {StudentHomeComponent} from "./components/home/student-home.component";
import {studentAuthGuard} from "../auth/auth-guard/auth.guard";

export const sudentRoutes: Routes = [
  {
    path: "", component: StudentLoginComponent
  },
  {
    path: "home", component: StudentHomeComponent, canActivate: [studentAuthGuard]
  },

]
