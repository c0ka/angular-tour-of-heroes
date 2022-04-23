import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage()
  }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out')
  }

  login() {
    this.message = 'Trying to log in ...'

    this.authService.login().subscribe(
      () => {
        this.message = this.getMessage()
        if (this.authService.isLoggedIn) {
          const redirectUrl = '/admin'
          // set our navigaion extras object
          // that passes on our global query params and fragment
          const navigationExtra: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          }
          this.router.navigate([redirectUrl], navigationExtra)
        }
      }
    )
  }

  logout() {
    this.authService.logout()
    this.message = this.getMessage()
  }

}
