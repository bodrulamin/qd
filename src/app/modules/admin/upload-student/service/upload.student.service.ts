import {Injectable} from '@angular/core';
import * as endpoint from "./upload.student.endpoints";
import {Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {StudentSearchModel} from "./domain/upload.student.model";
import {SAVE_QUESTION} from "../../question/edit-question/service/edit-question.endpoints";
import {UPLOAD_STUDENT} from "./upload.student.endpoints";


@Injectable({
  providedIn: 'root'
})
export class UploadStudentService extends BaseService {

  constructor() {
    super();
  }


  searchStudents(searchModel: StudentSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_STUDENTS,searchModel);
  }

  uploadStudent(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(UPLOAD_STUDENT, formData);
  }



}
