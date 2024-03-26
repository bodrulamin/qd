import {Injectable} from '@angular/core';
import * as endpoint from "./assign-examiner.endpoints";
import {Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {ExaminerSearchModel} from "./domain/assign-examiner.model";


@Injectable({
  providedIn: 'root'
})
export class AssignExaminerService extends BaseService {

  constructor() {
    super();
  }


  searchExaminer(searchModel: ExaminerSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_EXAMINERS,searchModel);
  }
  assignExaminer(searchModel: ExaminerSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.ASSIGN_EXAMINER,searchModel);
  }

  deleteExaminerAssignment(searchModel: ExaminerSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.ASSIGN_EXAMINER,searchModel);
  }

}
