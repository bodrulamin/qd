import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminLoggedInSubject = new BehaviorSubject<boolean>(false);
  isAdminLoggedIn$: Observable<boolean> = this.isAdminLoggedInSubject.asObservable();
  private isStudentLoggedInSubject = new BehaviorSubject<boolean>(false);
  isStudentLoggedIn$: Observable<boolean> = this.isStudentLoggedInSubject.asObservable();
  constructor() { }

  async adminLogin(username: string, password: string): Promise<void> {
        this.isAdminLoggedInSubject.next(true); // Update authentication state
  }

  adminLogout() {
    this.isAdminLoggedInSubject.next(false);
  }
}
