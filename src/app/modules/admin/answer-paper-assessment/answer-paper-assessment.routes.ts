import {Routes} from "@angular/router";
import {AnswerPaperAssessmentComponent} from "./components/answer-paper-assessment.component";
import {FindAnswerPaperComponent} from "./components/find-answer-paper/find-answer-paper.component";


export const answerPaperAssessmentRoutes: Routes = [
  {
    path: "", component: FindAnswerPaperComponent,
  },
  {
    path: "1", component: AnswerPaperAssessmentComponent,
  },

]
