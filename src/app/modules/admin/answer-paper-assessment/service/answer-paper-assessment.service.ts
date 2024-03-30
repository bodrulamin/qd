import {Injectable} from '@angular/core';
import * as endpoint from "./answer-paper-assessment.endpoints";
import {BehaviorSubject, Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {AnswerPaperSearchModel} from "./domain/answer-paper-assessment.model";
import {ADD_MARK} from "./answer-paper-assessment.endpoints";


@Injectable({
  providedIn: 'root'
})
export class AnswerPaperAssessmentService extends BaseService {

  constructor() {
    super();
  }

  searchModel = new BehaviorSubject(new AnswerPaperSearchModel());
  lastSearchModel = this.searchModel.asObservable();

  setLastSearchData(value: any) {
    this.searchModel.next(value);
  }
  getLastSearchModel(){
    return this.lastSearchModel;
  }

  searchAnswerPapers(searchModel: AnswerPaperSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_ANSWER_PAPER,searchModel);
  }

  assessPaper(examInfoWithQuestionSeq: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.ASSESS_ANSWER_PAPER,examInfoWithQuestionSeq);
  }

  addMark(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.ADD_MARK,data);
  }


}
