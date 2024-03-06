import {Injectable} from '@angular/core';
import {BaseService} from "../../base/service/base.service";
import {FETCH_CONFIGURATION} from "./admin.endpoints";


@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService{

  constructor() {
    super();
  }

  fetchConfiguration(){
    return this.http.get(FETCH_CONFIGURATION)
  }
}
