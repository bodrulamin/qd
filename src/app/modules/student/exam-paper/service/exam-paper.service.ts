import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {AnswerModel} from "./domain/exam-question.model";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {FETCH_FILE_BY_URL} from "../../../admin/question/edit-question/service/edit-question.endpoints";
import {SUBMIT_ANSWER} from "./exampaper.endpoint";

@Injectable({
  providedIn: 'root'
})
export class ExamPaperService extends BaseService {

  constructor() {
    super();

  }


  fetchByFileUrl(urlParam: Map<any, any>): Observable<Blob> {
    return this.http.get<Blob>(FETCH_FILE_BY_URL + this.getHttpParams(urlParam),);
  }

  submitAnswer(answerModel: AnswerModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(SUBMIT_ANSWER, answerModel);
  }
}
