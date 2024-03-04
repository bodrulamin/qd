import {Routes} from "@angular/router";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {CreateQuestionComponent} from "./components/question/create-question/create-question.component";
import {EditQuestionComponent} from "./components/question/edit-question/edit-question.component";
import {adminAuthGuard} from "../auth/auth-guard/auth.guard";
import {AdminLoginComponent} from "./components/login/admin-login.component";

export const adminRoutes: Routes = [
  {
    path: "",component: AdminLoginComponent
  },
  {
    path: "home", component: AppLayoutComponent, children: [
      {path: "create-question", component: CreateQuestionComponent},
      {path: "edit-question", component: EditQuestionComponent}
    ], canActivate: [adminAuthGuard]
  },

]
