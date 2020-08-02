import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './components/chat-list/chat-list.component'

const homeRoutes: Routes = [
  {
    path: '',
    component: ChatListComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
