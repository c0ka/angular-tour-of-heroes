import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError, Session } from '@supabase/gotrue-js';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loading: Boolean = false
  isSignedIn: Boolean = false

  constructor(public spService: SupabaseService, public router: Router) {
  }

  ngOnInit() {
    // this.spService.authChanges((_, session) => this.session = session)
    this.isSignedIn = !!this.spService.session?.user
  }

  async handleLogin(email: string, password: string) {
    try {
      this.loading = true;
      let {error} = await this.spService.signIn(email, password);
      if (error) alert('Something Wrong:' + error.message + error.status)
      alert('Check your email for the login link!');
    } catch (error) {
      alert( (error as ApiError).message)
    } finally {
      this.loading = false;
    }
  }

  async handleLogout(): Promise<void> {
    try {
      this.loading = true
      await this.spService.signOut()
      alert('Yor have logged out!')
      await this.router.navigate(['/dashboard'])
    } catch (error) {
      console.error(error)
    }
  }
}
