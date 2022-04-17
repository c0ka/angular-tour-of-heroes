import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { CachingInterceptor } from "./caching.interceptor";

/** Http interceptor provides in outside-in order */
export const HttpInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
]