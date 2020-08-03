import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';

@NgModule({
  declarations: [
    ChatListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
