import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { UserDTO } from '../modules/auth/models/UserDTO';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private onUserChanged = new Subject<UserDTO>();
  public userChangedEvent$ = this.onUserChanged.asObservable();

  public changeUser(user: UserDTO) {
    this.onUserChanged.next(user);
  }
}
