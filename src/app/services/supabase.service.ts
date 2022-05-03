import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, AuthChangeEvent, Session } from '@supabase/supabase-js'; 
import { environment } from 'src/environments/environment';
import { definitions } from './supabase.type';

export type Profile = definitions["profiles"] 

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient
  token: string | undefined

  constructor() { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get user() {
    return this.supabase.auth.user()
  }

  get session() {
    return this.supabase.auth.session()
  }

  get profile() {
    return this.supabase.from('profiles').select('username, website, avatar_url')
      .eq('id', this.user?.id)
      .single()
  }

  signIn(email: string, password: string) { 
    return this.supabase.auth.signIn({email, password}) 
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password })
  }

  signOut() {
    return this.supabase.auth.signOut().catch(console.error)
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session|null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  resetPassword(email: string) {
    return this.supabase.auth.api.resetPasswordForEmail(email)
  }

  handleNewPassword(newPassword: string) {
    return this.supabase.auth.api.updateUser(this.token as string, {
      password: newPassword,
    })
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      id: this.user?.id,
      updated_at: new Date()
    }
    return this.supabase.from('profiles').upsert(update, {
      returning: 'minimal',  // <-- Don't return the value after inserting
    })
  }

  downloadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage
      .from('avatars')
      .upload(filePath, file)
  }

  async getCrises() {
      const { data, error } =  await this.supabase.from<definitions["crises"]>('crises').select()
      return { data, error }
  }
}
