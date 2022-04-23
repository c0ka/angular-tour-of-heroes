import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MessageService } from './message.service';
import { MessagesComponent } from './messages.component';



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    MessageService
  ],
  exports: [MessagesComponent]
})
export class MessagesModule { }
