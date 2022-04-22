import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = []

  constructor() { }
  // implementation of strategy, load the route or not
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // use the preload flag in route.data to determine
    if (route.data?.['preload'] && route.path != null) {
      // side-effect to record the preloaded modules
      this.preloadedModules.push(route.path)
      console.log('Preloaded: ' + route.path)

      return load()
    } else {
      return of(null)
    }
  }
}
