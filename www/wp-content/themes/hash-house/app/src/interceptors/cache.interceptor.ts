import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    private cache = new Map<string, any>();

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Check if the request method is GET
        if (request.method !== 'GET') {
            return next.handle(request);
        }

        // Check if the response is already in cache
        const cachedResponse = this.cache.get(request.url);
        if (cachedResponse) {
            return of(cachedResponse);
        }

        // Continue with the request
        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    this.cache.set(request.url, event);
                }
            })
        );
    }
}