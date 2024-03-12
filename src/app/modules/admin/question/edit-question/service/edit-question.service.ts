import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "../../../../base/service/base.service";
import {ApiResponse} from "../../../../base/service/domain/api.response";
import {DELETE_QUESTION, FETCH_EXISTING_QUESTION, FETCH_FILE_BY_URL, SAVE_QUESTION} from "./edit-question.endpoints";
import {DeleteQuestionModel} from "./domain/question.model";

@Injectable({
  providedIn: 'root'
})
export class EditQuestionService extends BaseService {

  constructor() {
    super();
  }

  addQuestion(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(SAVE_QUESTION, formData);
  }

  deleteQuetion(deleteQuestionModel: DeleteQuestionModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(DELETE_QUESTION, deleteQuestionModel);
  }

  fetchExistingQuestion(urlParam: Map<any, any>): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(FETCH_EXISTING_QUESTION + this.getHttpParams(urlParam));
  }

  fetchByFileUrl(urlParam: Map<any, any>): Observable<Blob> {
    return this.http.get<Blob>(FETCH_FILE_BY_URL  + this.getHttpParams(urlParam),);
  }

}
