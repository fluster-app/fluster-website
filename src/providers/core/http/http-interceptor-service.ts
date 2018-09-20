import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {isPlatformServer} from '@angular/common';

import {Observable} from 'rxjs'

// Utils
import {Resources} from '../utils/resources';

// https://github.com/angular/universal/issues/858
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformServer(this.platformId) && req.url.includes('./')) {
      return next.handle(req.clone({
        url: `${Resources.Constants.SERVER.LOCAL_URL}/${req.url.replace('./', '')}`
      }));
    }

    return next.handle(req);
  }
}
