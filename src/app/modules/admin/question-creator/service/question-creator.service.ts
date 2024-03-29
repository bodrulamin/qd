import {Injectable} from '@angular/core';
import * as endpoint from "./question-creator.endpoints";
import {Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {CreatorSearchModel} from "./domain/question-creator.model";
import {ASSIGN_QUESTION_CREATOR} from "./question-creator.endpoints";


@Injectable({
  providedIn: 'root'
})
export class QuestionCreatorService extends BaseService {

  constructor() {
    super();
  }


  searchQuestionCreator(searchModel: CreatorSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_QUESTION_CREATORS, searchModel);
  }

  assignQuestionCreator(searchModel: CreatorSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.ASSIGN_QUESTION_CREATOR, searchModel);
  }

  deleteQuestionCreator(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.DELETE_QUESTION_CREATOR, data);
  }


}
