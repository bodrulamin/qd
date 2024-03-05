import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {USER_LOGIN} from "./auth.endpoint";
import {ApiResponse} from "../../base/service/domain/api.response";
import {BaseService} from "../../base/service/base.service";

const ADMIN_LOGIN = "ADMIN_LOGIN";
const TOKEN = "TOKEN";
const USER_DATA = "USER_DATA";
const STUDENT_LOGIN = "STUDENT_LOGIN";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  private isAdminLoggedInSubject = new BehaviorSubject<boolean>(false);
  isAdminLoggedIn$: Observable<boolean> = this.isAdminLoggedInSubject.asObservable();
  private isStudentLoggedInSubject = new BehaviorSubject<boolean>(false);
  isStudentLoggedIn$: Observable<boolean> = this.isStudentLoggedInSubject.asObservable();

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private http: HttpClient) {

    super();
    this.isAdminLoggedIn$.subscribe(isLoggedIn => {
      if (/^\/admin.*$/.test(this.route.url)) {
        return;
      }

      let adminPath = this.route.url.match('/admin.*');
      if (adminPath && !isLoggedIn) {
        this.adminLogout();
        this.route.navigate(["/admin"]);
      }
    })
  }

  async adminLogin(username: string, password: string): Promise<void> {
    this.http.post<ApiResponse>(USER_LOGIN, {username: username, password: password}).subscribe(response => {
      if (response.result) {
        localStorage.setItem(USER_DATA, response.data);
        localStorage.setItem(TOKEN, response.data.token);
        localStorage.setItem(ADMIN_LOGIN, 'true');
        this.isAdminLoggedInSubject.next(true); // Update authentication state
      } else {
        this.isAdminLoggedInSubject.next(false); // Update authentication state
      }
    });

  }


  studentLogin(username: string, password: string): Observable<any> {
    localStorage.setItem(STUDENT_LOGIN, 'true');
    this.isStudentLoggedInSubject.next(true); // Update authentication state
    return of(true)
  }

  adminLogout() {
    localStorage.removeItem(USER_DATA);
    localStorage.setItem(ADMIN_LOGIN, 'false');
    this.isAdminLoggedInSubject.next(false);
  }

  adminAuthenticated() {
    let loggedIn = localStorage.getItem(ADMIN_LOGIN);
    return loggedIn === 'true'
  }

  studentAutheticated() {
    let loggedIn = localStorage.getItem(STUDENT_LOGIN);
    return loggedIn === 'true'
  }

  studentLogout() {
    localStorage.setItem(STUDENT_LOGIN, 'false');
    this.isStudentLoggedInSubject.next(false);
  }
}
