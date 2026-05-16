import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MokkatAPIService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://mokattapi.onrender.com/api';

  get<T>(endpoint: string, params?: Record<string, string>) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.set(key, value);
      });
    }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }

  download<T>(endpoint: string, params?: Record<string, string>, options?: any) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.set(key, value);
      });
    }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params: httpParams, ...options });
  }

  post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any) {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }

  patch<T>(endpoint: string, body: any) {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  /** PATCH sin body — para endpoints toggle (toggle-active, toggle-available) */
  patchNoBody<T>(endpoint: string) {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, null);
  }

}
