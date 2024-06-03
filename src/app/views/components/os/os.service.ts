import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class OsService {
  path: string = '';

  constructor(private http: HttpClient, private snack: MatSnackBar) {
    this.path = environment.apiUrl;
  }

  findAll<T>(endpoint: string): Observable<T> {
    const newUrl = this.addEndpoint(endpoint);

    return this.http.get<T>(newUrl);
  }

  findById<T>(id: number | string, endpoint: string): Observable<T> {
    const newUrl = this.addEndpoint(endpoint);

    return this.http.get<T>(newUrl + '/' + id);
  }

  post<T>(endpoint: string, data: object): Observable<T> {
    const newUrl = this.addEndpoint(endpoint);

    return this.http.post<T>(newUrl, data);
  }

  put<T>(endpoint: string, data: object | any): Observable<T> {
    const newUrl = this.addEndpoint(endpoint);

    return this.http.put<T>(`${newUrl}`, data);
  }

  saveOrUpdate<T>(endpoint: string, data: object | any): Observable<T> {
    if (data.id) {
      return this.put<T>(endpoint, data);
    } else {
      return this.post<T>(endpoint, data);
    }
  }

  addEndpoint(endpoint: string | any): string {
    return endpoint ? `${this.path}/${endpoint}` : this.path;
  }

  message(msg: string) {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
