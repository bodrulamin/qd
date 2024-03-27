import {Injectable} from '@angular/core';
import * as endpoint from "./exam-scheduling.endpoints";
import {BehaviorSubject, Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {ExamSearchModel, ScheduleModel} from "./domain/exam-scheduling.model";


@Injectable({
  providedIn: 'root'
})
export class ExamSchedulingService extends BaseService {

  searchModel = new BehaviorSubject(null);
  lastSearchModel = this.searchModel.asObservable();

  setLastSearchData(value: any) {
    this.searchModel.next(value);
  }
  getLastSearchModel(){
    return this.lastSearchModel;
  }

  constructor() {
    super();
  }


  searchQuestion(searchModel: ExamSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_EXAM_QUESTION, searchModel);
  }

  saveSchedule(schedules: ScheduleModel[]): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.UPDATE_SCHEDULE, schedules);
  }


}
