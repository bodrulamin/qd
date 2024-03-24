import {Injectable} from '@angular/core';
import {BaseService} from "../../../base/service/base.service";
import {Observable} from "rxjs";
import {SEARCH_USERS} from "./user.lookup.endpoints";


@Injectable({
  providedIn: 'root'
})
export class UserLookupService extends BaseService {

  constructor() {
    super();
  }


  searchUsers(searchText: any, urlSearchParam: Map<any, any>): Observable<any> {
    let options = this.getHttpParams(urlSearchParam);
    return this.http.post(SEARCH_USERS+options, searchText);
  }


}
