import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, NavigationExtras, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,  // <-- future route will be activated
    state: RouterStateSnapshot      // <-- future route state should be guard check
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url
    
    return this.checkLogin(url)
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,  // <-- future route will be activated
    state: RouterStateSnapshot      // <-- future route state should be guard check
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.canActivate(route, state)
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`

    return this.checkLogin(url)
  }
  
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true }

    // store the attempted URL for redirecting
    this.authService.redirectUrl = url
    // Create a dummy session id
    const sessionId = 123456789
    // global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { sessionId: sessionId },
      fragment: 'anchor'
    }

    // Redirect to the login page
    // return this.router.parseUrl('/login')
    this.router.createUrlTree(['/login'], navigationExtras)
    return false
  }
}
