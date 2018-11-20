import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(


        // Succeeds when there is a response; ignore other events
       (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event);
          }
          return event;
        },
        // Operation failed; error is an HttpErrorResponse
        (error: HttpEvent<any>) => {
          // code handle error hear
          console.log(error);
          return error;
        },
      )
      , finalize(() => {
        // do somthing with finalize
        console.log('finalize function');
        return event;
      }
      )

    );
  }
}
