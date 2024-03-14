import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse, HttpSentEvent
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
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
    let contentType = 'application/json';
    let headers: any = {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType
    };
    if (request.body instanceof FormData) {
      headers = {
        Authorization: `Bearer ${token}`
      };
    }
    if (token) {
      if (request.url.includes('get-exam-question-details-file')) {
        request = request.clone({
          setHeaders: headers, responseType: 'arraybuffer'
        });
      } else {
        request = request.clone({
          setHeaders: headers
        });
      }

    }

    // Continue with the request
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors
        const htmlErrorMessages = {
          400: "Bad Request",
          401: "Unauthorized",
          403: "Forbidden",
          404: "Not Found",
          405: "Method Not Allowed",
          500: "Internal Server Error",
          502: "Bad Gateway",
          503: "Service Unavailable",
          504: "Gateway Timeout",
        };

        if (error.status === 401) {
          this.authService.adminLogout();
          this.authService.studentLogout();
        }
        let errorMsg = error.status >= 500 ? htmlErrorMessages[error.status] : error.error.remarks ? error.error.remarks.join(', ') : error.statusText;
        this.messageService.add({
          summary: 'Error',
          detail: errorMsg,
          severity: 'error'
        });
        // Pass the error to the caller of the request
        return throwError(error);
      })
    );
  }
}
