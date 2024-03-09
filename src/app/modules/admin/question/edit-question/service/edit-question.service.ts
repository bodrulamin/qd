import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "../../../../base/service/base.service";
import {ApiResponse} from "../../../../base/service/domain/api.response";
import {FETCH_EXISTING_QUESTION, SAVE_QUESTION} from "./edit-question.endpoints";

@Injectable({
  providedIn: 'root'
})
export class EditQuestionService extends BaseService {

  constructor() {
    super();
  }

  addQuestion(formdata: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(SAVE_QUESTION, formdata);
  }

  fetchExistingQuestion(urlParam: Map<any, any>): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(FETCH_EXISTING_QUESTION + this.getHttpParams(urlParam));
  }


}
