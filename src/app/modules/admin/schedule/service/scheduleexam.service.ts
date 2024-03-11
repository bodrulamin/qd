import {Injectable} from '@angular/core';
import * as endpoint from "./schedule-exam.endpoints";
import {Observable} from "rxjs";
import {SearchQuestionModel} from "./domain/search-question.model";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";


@Injectable({
  providedIn: 'root'
})
export class ScheduleexamService extends BaseService {

  constructor() {
    super();
  }

  fetchConfiguration(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(endpoint.FETCH_CONFIGURATION);
  }
  searchQuestion(searchModel: SearchQuestionModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_EXAM_QUESTION,searchModel);
  }


}
