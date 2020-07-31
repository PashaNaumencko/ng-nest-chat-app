import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './components/chat-list/chat-list.component'
import { CommonModule } from '@angular/common';

const homeRoutes: Routes = [
  {
    path: '',
    component: ChatListComponent
  }
]

@NgModule({
  declarations: [ChatListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
