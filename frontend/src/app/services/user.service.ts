import { Injectable } from '@angular/core';
import { HttpInternalService } from '../services/http-internal.service';
import { UserDTO } from '../modules/auth/models/UserDTO';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  public routePrefix = 'user';

  constructor(private httpService: HttpInternalService) {}

  public getUserFromToken(): Observable<UserDTO> {
    return this.httpService.get<UserDTO>(`${this.routePrefix}/current`);
  }

  public getUserById(id: string): Observable<UserDTO> {
    return this.httpService.get<UserDTO>(`${this.routePrefix}/${id}`);
  }
}
