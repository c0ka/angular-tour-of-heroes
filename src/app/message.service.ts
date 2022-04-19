import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages$ = new Subject<string>()

  constructor() { }

  emit(message: string) {
    this.messages$.next(message)
  }
}
