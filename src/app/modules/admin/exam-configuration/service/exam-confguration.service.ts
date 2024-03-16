import {Injectable} from '@angular/core';
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {ADD_EXAM, DELETE_EXAM, FETCH_EXAM_LIST} from "./exam-configuration.endpoints";
import {Observable} from "rxjs";
import {ExamModel, ExamSearchModel} from "./domain/exam.model";

@Injectable({
  providedIn: 'root'
})
export class ExamConfgurationService extends BaseService {

  constructor() {
    super();
  }

  addExam(exam: ExamModel): Observable<any> {
    return this.http.post(ADD_EXAM, exam);
  }
  deleteExamConfig(exam: ExamModel): Observable<any> {
    return this.http.post(DELETE_EXAM, exam);
  }

  fetchExamList(urlSearchParam: Map<any, any>, searchModel: ExamSearchModel): Observable<any> {
    return this.http.post<any>(FETCH_EXAM_LIST + this.getHttpParams(urlSearchParam), searchModel);
  }


}
