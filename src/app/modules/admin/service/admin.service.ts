import {Injectable} from '@angular/core';
import {BaseService} from "../../base/service/base.service";
import {FETCH_CONFIGURATION} from "./admin.endpoints";
import {Observable, of} from "rxjs";
import {ApiResponse} from "../../base/service/domain/api.response";


@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService{

  constructor() {
    super();
  }

  fetchConfiguration():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(FETCH_CONFIGURATION);
  }
}
