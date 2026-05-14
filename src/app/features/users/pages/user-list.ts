import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserResponse, CreateUserRequest, UpdateUserRequest } from '../../../core/models/User.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  private readonly userService = inject(UserService);

  users: UserResponse[] = [];
  search = '';

  form: CreateUserRequest = this.emptyForm();
  editing = false;
  selectedId?: string;

  ngOnInit() {
    this.load();
  }

  emptyForm(): CreateUserRequest {
    return { name: '', email: '', password: '' };
  }

  load() {
    this.userService.getUsers()
      .subscribe(data => this.users = data);
  }

  save() {
    if (!this.form.name || !this.form.email) return;

    if (this.editing && this.selectedId) {
      const payload: UpdateUserRequest = {
        name: this.form.name || undefined,
        password: this.form.password || undefined
      };
      this.userService.updateUser(this.selectedId, payload)
        .subscribe(() => {
          this.resetForm();
          this.load();
        });
    } else {
      if (!this.form.password) return;
      this.userService.createUser(this.form)
        .subscribe(() => {
          this.resetForm();
          this.load();
        });
    }
  }

  edit(user: UserResponse) {
    this.form = {
      name: user.name,
      email: user.email,
      password: ''
    };
    this.editing = true;
    this.selectedId = user.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleActive(id: string) {
    this.userService.toggleActive(id)
      .subscribe(() => this.load());
  }

  resetForm() {
    this.form = this.emptyForm();
    this.editing = false;
    this.selectedId = undefined;
  }

  get filteredUsers() {
    if (!this.search) return this.users;
    const term = this.search.toLowerCase();
    return this.users.filter(u =>
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term)
    );
  }

}
