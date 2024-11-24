import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from "../notification.service";
import { CredentialService } from "../credential.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private readonly credentialsService: CredentialService,
    private readonly notificationService: NotificationService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authorizationToken = localStorage.getItem('authorization_token');

    if (!authorizationToken) {
      this.credentialsService.storeCredentials();
    }

    if (req.url.includes('/import') && authorizationToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Basic ${authorizationToken}`)
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            // Handling 401 and 403 errors
            this.notificationService.showError(
              `Request failed with status: ${error.status}`,
              0
            );
          }
          return throwError(error);
        })
      );
    }

    return next.handle(req);
  }
}
