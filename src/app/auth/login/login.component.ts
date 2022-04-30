import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'src/app/messages/message.service';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: Boolean = false

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('')
  })

  constructor(
    public supabase: SupabaseService, 
    public router: Router,
    private messageService: MessageService
    ) { }

  async onFormSubmit() {
      const { email, password } = this.loginForm.value

      this.loading = true;
      let { user, error } = await this.supabase.signIn(email, password)
      
      this.loading = false;
      this.loginForm.reset()
      if (error) {
        this.messageService.emit('Error: ' + error.message)
      } else {
        this.messageService.emit('Welcome on board: ' + user?.email)
        this.router.navigate(['/dashboard'])
      }
  }

  async handleLogout(): Promise<void> {
    try {
      this.loading = true
      await this.supabase.signOut()
      alert('Yor have logged out!')
      await this.router.navigate(['/dashboard'])
    } catch (error) {
      console.error(error)
    }
  }
}
