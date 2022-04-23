import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,  // <-- future route will be activated
    state: RouterStateSnapshot      // <-- future route state should be guard check
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url
    
    return this.checkLogin(url)
  }
  
  checkLogin(url: string): true|UrlTree {
    if (this.authService.isLoggedIn) { return true }

    // store the attempted URL for redirecting
    this.authService.redirectUrl = url

    // Redirect to the login page
    return this.router.parseUrl('/login')
  }
}
