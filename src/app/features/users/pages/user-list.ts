import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserResponse, CreateUserRequest, UpdateUserRequest } from '../../../core/models/User.model';
import { AlertService } from '../../../core/services/alert.service';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  private readonly userService = inject(UserService);
  private readonly alertService = inject(AlertService);

  users: UserResponse[] = [];
  search = '';
  page = 1;
  pageSize = 10;

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
      .subscribe({
        next: data => this.users = data,
        error: err => this.alertService.error('Error al cargar usuarios', err?.error?.message)
      });
  }

  save() {
    if (!this.form.name || !this.form.email) {
      this.alertService.warning('Campos requeridos', 'Por favor ingresa nombre y correo electrónico.');
      return;
    }

    if (this.editing && this.selectedId) {
      const payload: UpdateUserRequest = {
        name: this.form.name || undefined,
        password: this.form.password || undefined
      };
      this.userService.updateUser(this.selectedId, payload)
        .subscribe({
          next: () => {
            this.alertService.success('Usuario actualizado');
            this.resetForm();
            this.load();
          },
          error: err => this.alertService.error('Error al actualizar', err?.error?.message)
        });
    } else {
      if (!this.form.password) {
        this.alertService.warning('Campo requerido', 'La contraseña es obligatoria para un nuevo usuario.');
        return;
      }
      this.userService.createUser(this.form)
        .subscribe({
          next: () => {
            this.alertService.success('Usuario creado');
            this.resetForm();
            this.load();
          },
          error: err => this.alertService.error('Error al crear usuario', err?.error?.message)
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
      .subscribe({
        next: () => {
          this.alertService.success('Estado actualizado');
          this.load();
        },
        error: err => this.alertService.error('Error al actualizar estado', err?.error?.message)
      });
  }

  resetForm() {
    this.form = this.emptyForm();
    this.editing = false;
    this.selectedId = undefined;
  }



}
