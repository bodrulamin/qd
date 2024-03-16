import {Injectable} from '@angular/core';
import {BaseService} from "../../../base/service/base.service";
import {ADD_SUBJECT, DELETE_SUBJECT} from "./subject-config.endpoints";
import {Observable} from "rxjs";
import {SubjectModel} from "./domain/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectCofigService extends BaseService {

  constructor() {
    super();
  }


  addSubject(subjectModel: SubjectModel): Observable<any> {
    return this.http.post(ADD_SUBJECT, subjectModel);
  }

  deleteSubject(subjectModel: SubjectModel): Observable<any> {
    return this.http.post(DELETE_SUBJECT, subjectModel);
  }


}
