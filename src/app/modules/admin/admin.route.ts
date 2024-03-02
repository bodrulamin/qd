import {Routes} from "@angular/router";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {CreateQuestionComponent} from "./components/question/create-question/create-question.component";

export const adminRoutes: Routes = [
  {
    path: "", loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
  },
  {
    path: "home", component: AppLayoutComponent, children: [
      {path: "create-question", component: CreateQuestionComponent}
    ]
  },

]
