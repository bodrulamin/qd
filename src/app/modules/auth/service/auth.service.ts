import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {STUDENT_LOGIN, USER_LOGIN} from "./auth.endpoint";
import {ApiResponse} from "../../base/service/domain/api.response";
import {BaseService} from "../../base/service/base.service";


export const STUDENT_DATA = "STUDENT_DATA";
export const ADMIN_DATA = "ADMIN_DATA";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private isAdminLoggedInSubject = new BehaviorSubject<boolean>(false);
  isAdminLoggedIn$: Observable<boolean> = this.isAdminLoggedInSubject.asObservable();
  private isStudentLoggedInSubject = new BehaviorSubject<boolean>(false);
  isStudentLoggedIn$: Observable<boolean> = this.isStudentLoggedInSubject.asObservable();

  constructor(private router: Router) {

    super();
    this.adminUnauthorizedRedirection();
  }

  adminLogin(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(USER_LOGIN, {username: username, password: password});
  }

  adminLogout() {
    this.clearLocalData();
    this.isAdminLoggedInSubject.next(false);
  }

  studentLogin(username: string, password: string): Observable<any> {
    return this.http.post<ApiResponse>(STUDENT_LOGIN, {username: username, password: password});
  }

  studentLogout() {
    this.clearLocalData();
    this.isStudentLoggedInSubject.next(false);
  }


  private adminUnauthorizedRedirection() {
    this.isAdminLoggedIn$.subscribe(isLoggedIn => {
      if (this.router.url == '/admin') {
        return;
      }
      let adminPath = /^\/admin.*$/.test(this.router.url);
      if (adminPath && !isLoggedIn) {
        localStorage.removeItem(ADMIN_DATA);
        this.router.navigate(["/admin"]);
      }
    });
  }

  clearLocalData() {
    localStorage.removeItem(STUDENT_DATA);
    localStorage.removeItem(ADMIN_DATA);
  }


  adminAuthenticated() {
    let data = this.getData(ADMIN_DATA);
    return data && data.token;
  }

  studentAutheticated() {
    let data = this.getData(STUDENT_DATA);
    return data && data.token;
  }


  getAdminToken() {
    let data = this.getData(ADMIN_DATA)
    return data ? data.token : null;
  }


  getStudentToken() {
    let data = this.getData(STUDENT_DATA)
    return data ? data.token : null;
  }


  saveData(key: string, data: any): void {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  getData(key: string): any {
    const jsonData = localStorage.getItem(key);
    return JSON.parse(jsonData);
  }

  getToken() {
    let adminPath = /^\/admin.*$/.test(this.router.url);
    if (adminPath) {
      return this.getAdminToken();
    } else {
      this.getStudentToken();
    }
  }
}
