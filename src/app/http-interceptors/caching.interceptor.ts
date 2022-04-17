import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, startWith, tap } from 'rxjs';

import { RequestCache } from '../request-cache.service';

const cacheableUrl: string = 'assets/mock-heroes'

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor( private cache: RequestCache) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // continue if not cacheable.
    if (!isCacheable(request)) { return next.handle(request) }

    const cachedResponse = this.cache.get(request)
    // cache-then-refresh
    if (request.headers.get('x-refresh')) {
      const results$ = sendRequest(request, next, this.cache)
      return cachedResponse ?
        results$.pipe( startWith(cachedResponse)) : results$
    }
    // cache-or-fetch
    return cachedResponse ?
      of(cachedResponse) : sendRequest(request, next, this.cache)
  }

}

/** Is the request cacheable? */
function isCacheable(req: HttpRequest<any>) {
  return req.method === 'GET' &&
    -1 < req.url.indexOf(cacheableUrl)
}

function sendRequest(
  req: HttpRequest<any>, next: HttpHandler, cache: RequestCache
  ): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    // Adding side-effect to the response event
    tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(req, event)  // Update the cache.
      }
    })
  )
  }