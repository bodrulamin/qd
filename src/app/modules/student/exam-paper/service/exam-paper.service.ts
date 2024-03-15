import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {FETCH_FILE_BY_URL} from "../../../admin/question/edit-question/service/edit-question.endpoints";

@Injectable({
  providedIn: 'root'
})
export class ExamPaperService extends BaseService{

  constructor() {
    super();

  }


  fetchByFileUrl(urlParam: Map<any, any>): Observable<Blob> {
    return this.http.get<Blob>(FETCH_FILE_BY_URL  + this.getHttpParams(urlParam),);
  }
}
