import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
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

  constructor() {
  }

  async adminLogin(username: string, password: string): Promise<void> {
    localStorage.setItem(ADMIN_LOGIN,'true');
    this.isAdminLoggedInSubject.next(true); // Update authentication state
  }


  async studentLogin(username: string, password: string): Promise<void> {
    localStorage.setItem(STUDENT_LOGIN,'true');
    this.isStudentLoggedInSubject.next(true); // Update authentication state
  }

  adminLogout() {
    localStorage.setItem(ADMIN_LOGIN,'false');
    this.isAdminLoggedInSubject.next(false);
  }

  isAdminLoggedIn(){
    let loggedIn = localStorage.getItem(ADMIN_LOGIN);
    return loggedIn === 'true'
  }

  isStudentLoggedIn(){
    let loggedIn = localStorage.getItem(STUDENT_LOGIN);
    return loggedIn === 'true'
  }

  studentLogout() {
    localStorage.setItem(STUDENT_LOGIN,'false');
    this.isStudentLoggedInSubject.next(false);
  }
}
