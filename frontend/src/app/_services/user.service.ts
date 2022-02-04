/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authservice: AuthService, private httpClient: HttpClient) { }

  create(user: any): Observable<any> {
      return this.httpClient.post(environment.apiUrl + '/api/user/', user);
  }

  getOne(id: string): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.get(environment.apiUrl + '/api/user/' + id, { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }

  getAll(): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.get(environment.apiUrl + '/api/user/', { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }

  update(user: any, id: string): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.put(environment.apiUrl + '/api/user/' + id, user, { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }

  delete(id: string): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.delete(environment.apiUrl + '/api/user/' + id, { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }
}
