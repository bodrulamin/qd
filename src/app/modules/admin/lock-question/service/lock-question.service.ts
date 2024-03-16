import {Injectable} from '@angular/core';
import * as endpoint from "./lock-question.endpoints";
import {Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {ExamSearchModel, LockModel, ScheduleModel} from "./domain/lock.model";
import {UPDATE_SCHEDULE} from "./lock-question.endpoints";


@Injectable({
  providedIn: 'root'
})
export class LockQuestionService extends BaseService {

  constructor() {
    super();
  }

  searchQuestionToLockUnlock(searchModel: ExamSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_EXAM_QUESTION_FOR_LOCK_UNLOCK, searchModel);
  }

  lockUnlockQuestion(lockModels: LockModel[]): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.LOCK_UNLOCK, lockModels);
  }

}
