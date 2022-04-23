import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from '../messages/message.service';

import { Crisis } from './crisis';
import { CRISES } from './mock-crises';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {
  private crisis$ = new BehaviorSubject<Crisis[]>(CRISES)
  static nextCrisisId = 100

  constructor(private messageService: MessageService) { }

  getCrisis() {
    return this.crisis$
  }

  addCrisis(name: string) {
    name = name.trim()
    if (name) {
      const crisis = { id: CrisisService.nextCrisisId++, name }
      CRISES.push(crisis)
      this.crisis$.next(CRISES)
    }
  }
}
