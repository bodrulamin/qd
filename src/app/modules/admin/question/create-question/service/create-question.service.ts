import {Injectable} from '@angular/core';
import {FETCH_CONFIGURATION} from "./create-question.endpoints";
import {Observable} from "rxjs";
import {BaseService} from "../../../../base/service/base.service";
import {ApiResponse} from "../../../../base/service/domain/api.response";
import {SearchQuestionModel} from "./domain/question.model";


@Injectable({
  providedIn: 'root'
})
export class CreateQuestionService extends BaseService {

  constructor() {
    super();
  }

  fetchConfiguration(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(FETCH_CONFIGURATION);
  }


  searchQuestion(searchModel: SearchQuestionModel) {
    let a = new SearchQuestionModel();
  }
}
