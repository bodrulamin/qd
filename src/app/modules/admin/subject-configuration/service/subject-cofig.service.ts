import {Injectable} from '@angular/core';
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {ADD_SUBJECT, DELETE_SUBJECT, FETCH_CONFIGURATION} from "./subject-config.endpoints";
import {Observable} from "rxjs";
import {SubjectModel} from "./domain/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectCofigService extends BaseService {

  constructor() {
    super();
  }

  fetchConfiguration(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(FETCH_CONFIGURATION);
  }

  addSubject(subjectModel: SubjectModel): Observable<any> {
    return this.http.post(ADD_SUBJECT, subjectModel);
  }

  deleteSubject(subjectModel: SubjectModel): Observable<any> {
    return this.http.post(DELETE_SUBJECT, subjectModel);
  }


}
