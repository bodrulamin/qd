import {Injectable} from '@angular/core';
import * as endpoint from "./upload.student.endpoints";
import {Observable} from "rxjs";
import {BaseService} from "../../../base/service/base.service";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {StudentSearchModel} from "./domain/upload.enrollment.model";
import {SAVE_QUESTION} from "../../question/edit-question/service/edit-question.endpoints";
import {UPLOAD_STUDENT_ENROLLMENT} from "./upload.student.endpoints";


@Injectable({
  providedIn: 'root'
})
export class UploadEnrollmentService extends BaseService {

  constructor() {
    super();
  }


  searchEnrolledStudents(searchModel: StudentSearchModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(endpoint.SEARCH_ENROLLED_STUDENTS,searchModel);
  }

  uploadStudentEnrollment(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(UPLOAD_STUDENT_ENROLLMENT, formData);
  }



}
