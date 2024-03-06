import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from "../../auth/service/auth.service";
import {MessageService} from "primeng/api";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private messageService: MessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from the AuthService
    const token = this.authService.getToken();

    // If a token exists, add it to the request headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continue with the request
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        if (error.status === 401) {
          this.authService.adminLogout();
          this.authService.studentLogout();
        } else {
          this.messageService.add({summary: 'Error', detail: error.error.remarks.join(', '), severity: 'error'})
        }
        // Pass the error to the caller of the request
        return throwError(error);
      })
    );
  }
}
