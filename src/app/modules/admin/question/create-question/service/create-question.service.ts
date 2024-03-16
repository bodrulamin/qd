import {Injectable} from '@angular/core';
import {SEARCH_QUESTION} from "./create-question.endpoints";
import {Observable} from "rxjs";
import {BaseService} from "../../../../base/service/base.service";
import {ApiResponse} from "../../../../base/service/domain/api.response";
import {SearchQuestionModel} from "./domain/search-question.model";


@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService extends BaseService {

  constructor() {
    super();
  }


  searchQuestion(searchModel: SearchQuestionModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(SEARCH_QUESTION,searchModel);
  }


}
