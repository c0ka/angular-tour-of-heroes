/** EventEmitter wrapping the RxJS Subject */
import { Injectable } from '@angular/core';
import { bufferTime, Subject } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages$ = new Subject<string>()

  constructor( private _snackBar: MatSnackBar ) {
    this.messages$
      .subscribe(
        // todo: data persistance
        value => this._snackBar.open( value, undefined, { duration: 3000 })
      )
  }

  emit(message: string) {
    this.messages$.next(message)
  }

  /** Event subscribe method wrapping RxJS Subject's counterpart.
   * @param next Event handler
   */
  subscribe( next: (value: string) => void ): unknown {
    return this.messages$.subscribe( next )
  }
}
