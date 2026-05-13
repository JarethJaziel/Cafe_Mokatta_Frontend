import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { Sidebar } from "./layout/sidebar/sidebar.component";
import { Header } from "./layout/header/header.component";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cafe_mokatta_frontend');
  public authService = inject(AuthService);
}

