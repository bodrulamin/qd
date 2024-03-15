import { Injectable} from '@angular/core';
import {StartExam} from "../components/instruction.component";
import {Observable} from "rxjs";
import {ApiResponse} from "../../../base/service/domain/api.response";
import {FETCH_CONFIGURATION} from "../../../admin/service/admin.endpoints";
import {BaseService} from "../../../base/service/base.service";
import {START_EXAM} from "./instruction.endpoint";

@Injectable({
  providedIn: 'root'
})
export class InstuctionService extends BaseService{

  constructor() {
    super();

  }


  startExam(startExamModel: StartExam): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(START_EXAM,startExamModel);
  }
}
