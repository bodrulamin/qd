import {Injectable} from '@angular/core';
import {BaseService} from "../../base/service/base.service";
import {ADD_EXAM, ADD_SUBJECT, FETCH_CONFIGURATION, FETCH_EXAM_LIST} from "./admin.endpoints";
import {Observable, of} from "rxjs";
import {ApiResponse} from "../../base/service/domain/api.response";
import {ExamModel, ExamSearchModel} from "./domain/exam.model";
import {SubjectModel} from "./domain/subject.model";


@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {

  constructor() {
    super();
  }

  fetchConfiguration(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(FETCH_CONFIGURATION);
  }

  addExam(exam: ExamModel): Observable<any> {
    return this.http.post(ADD_EXAM, exam);
  }

  addSubject(subjectModel: SubjectModel): Observable<any> {
    return this.http.post(ADD_SUBJECT, subjectModel);
  }

  fetchExamList(urlSearchParam: Map<any, any>, searchModel: ExamSearchModel): Observable<any> {
    return this.http.post<any>(FETCH_EXAM_LIST + this.getHttpParams(urlSearchParam), searchModel);
  }


}
