import {Injectable} from '@angular/core';
import {SEARCH_QUESTION} from "./create-question.endpoints";
import {BehaviorSubject, Observable} from "rxjs";
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
  searchModel = new BehaviorSubject(new SearchQuestionModel());
  lastSearchModel = this.searchModel.asObservable();

  setLastSearchData(value: any) {
    this.searchModel.next(value);
  }
  getLastSearchModel(){
    return this.lastSearchModel;
  }



  searchQuestion(searchModel: SearchQuestionModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(SEARCH_QUESTION,searchModel);
  }


}
