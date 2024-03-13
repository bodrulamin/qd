import {Injectable} from '@angular/core';
import * as endpoint from "./exam-scheduling.endpoints";
import {Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {ExamSearchModel, ScheduleModel} from "./domain/exam-scheduling.model";
import {UPDATE_SCHEDULE} from "./exam-scheduling.endpoints";


@Injectable({
  providedIn: 'root'
})
export class ExamSchedulingService extends BaseService {

  constructor() {
    super();
  }

  fetchConfiguration(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(endpoint.FETCH_CONFIGURATION);
  }

  searchQuestion(searchModel: ExamSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_EXAM_QUESTION,searchModel);
  }
  saveSchedule(schedules: ScheduleModel[]): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.UPDATE_SCHEDULE,schedules);
  }


}
