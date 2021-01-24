import { CommonModule } from '@angular/common';
import { HttpHandler, HttpHeaderResponse, HttpHeaders, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const session = JSON.parse(localStorage.getItem('session'));

    if (session && Object.keys(session).length > 0) {
      const headers = new HttpHeaders()
        .append('Authorization', `Bearer ${session.token}`);

      const cloneReq = req.clone({
        headers: headers
      });

      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class InterceptorsModule { }
