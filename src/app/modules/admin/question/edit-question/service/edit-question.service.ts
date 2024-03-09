import {Injectable} from '@angular/core';
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {ADD_EXAM, FETCH_CONFIGURATION, FETCH_EXAM_LIST} from "./edit-question.endpoints";
import {Observable} from "rxjs";
import {ExamModel, ExamSearchModel} from "./domain/exam.model";

@Injectable({
  providedIn: 'root'
})
export class EditQuestionService extends BaseService {

  constructor() {
    super();
  }

  fetchConfiguration(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(FETCH_CONFIGURATION);
  }

  addExam(exam: ExamModel): Observable<any> {
    return this.http.post(ADD_EXAM, exam);
  }

  fetchExamList(urlSearchParam: Map<any, any>, searchModel: ExamSearchModel): Observable<any> {
    return this.http.post<any>(FETCH_EXAM_LIST + this.getHttpParams(urlSearchParam), searchModel);
  }


}
