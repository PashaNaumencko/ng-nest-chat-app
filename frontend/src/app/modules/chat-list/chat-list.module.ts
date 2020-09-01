import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';


@NgModule({
  declarations: [ChatListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ChatListComponent
  ]
})
export class ChatListModule { }
