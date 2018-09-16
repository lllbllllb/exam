import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HeadersSetterInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
/*    if (!req.headers.get('Content-Type')) {
      const authReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }*/

    return next.handle(req);

  }
}
