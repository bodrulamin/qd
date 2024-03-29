import {Injectable} from '@angular/core';
import * as endpoint from "./assign-examiner.endpoints";
import {BehaviorSubject, Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {ExaminerSearchModel} from "./domain/assign-examiner.model";
import {DELETE_EXAMINER} from "./assign-examiner.endpoints";


@Injectable({
  providedIn: 'root'
})
export class AssignExaminerService extends BaseService {

  constructor() {
    super();
  }

  searchModel = new BehaviorSubject(new ExaminerSearchModel());
  lastSearchModel = this.searchModel.asObservable();

  setLastSearchData(value: any) {
    this.searchModel.next(value);
  }
  getLastSearchModel(){
    return this.lastSearchModel;
  }

  searchExaminer(searchModel: ExaminerSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_EXAMINERS,searchModel);
  }
  assignExaminer(searchModel: ExaminerSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.ASSIGN_EXAMINER,searchModel);
  }

  deleteExaminerAssignment(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.DELETE_EXAMINER,data);
  }

}
