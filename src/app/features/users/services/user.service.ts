import { inject, Injectable } from '@angular/core';
import { MokkatAPIService } from '../../../core/services/mokkat-api.service';
import { UserResponse, CreateUserRequest, UpdateUserRequest } from '../../../core/models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly api = inject(MokkatAPIService);

  getUsers() {
    return this.api.get<UserResponse[]>('users');
  }

  getUser(id: string) {
    return this.api.get<UserResponse>(`users/${id}`);
  }

  createUser(user: CreateUserRequest) {
    return this.api.post<UserResponse>('users', user);
  }

  updateUser(id: string, user: UpdateUserRequest) {
    return this.api.patch<UserResponse>(`users/${id}`, user);
  }

  toggleActive(id: string) {
    return this.api.patchNoBody<void>(`users/${id}/toggle-active`);
  }

}
