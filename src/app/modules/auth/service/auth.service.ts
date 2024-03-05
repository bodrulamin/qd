import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

const ADMIN_LOGIN = "ADMIN_LOGIN";
const STUDENT_LOGIN = "STUDENT_LOGIN";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminLoggedInSubject = new BehaviorSubject<boolean>(false);
  isAdminLoggedIn$: Observable<boolean> = this.isAdminLoggedInSubject.asObservable();
  private isStudentLoggedInSubject = new BehaviorSubject<boolean>(false);
  isStudentLoggedIn$: Observable<boolean> = this.isStudentLoggedInSubject.asObservable();

  constructor(private activatedRoute: ActivatedRoute, private route:Router) {
    this.isAdminLoggedIn$.subscribe(isLoggedIn => {
      let adminPath = this.route.url.startsWith('/admin');
      if (adminPath && !isLoggedIn) {
            this.route.navigate(["/admin"]);
      }
    })
  }

  async adminLogin(username: string, password: string): Promise<void> {
    localStorage.setItem(ADMIN_LOGIN, 'true');
    this.isAdminLoggedInSubject.next(true); // Update authentication state
  }


  studentLogin(username: string, password: string): Observable<any> {
    localStorage.setItem(STUDENT_LOGIN, 'true');
    this.isStudentLoggedInSubject.next(true); // Update authentication state
    return of(true)
  }

  adminLogout() {
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
