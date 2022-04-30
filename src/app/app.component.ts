import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';

import { AuthService } from './auth/auth.service';
import { SupabaseService } from './auth/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit{
  title = 'Tour of Heroes'
  isLoggedIn = false

  constructor(public authService: AuthService, private supabase: SupabaseService) {
    this.isLoggedIn = !!supabase.user
  }

  ngOnInit() {
    this.supabase.authChanges((_, session) => {
      this.isLoggedIn = !!session?.user
    })
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation']
  }

}
