/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  AUTH_SERVER = 'http://127.0.0.1:5400';

  constructor(private authservice: AuthService, private httpClient: HttpClient) { }

  create(user: any): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.post(this.AUTH_SERVER + '/api/user/' + user, { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }

  getOne(id: string): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.get(this.AUTH_SERVER + '/api/user/' + id, { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }

  getAll(): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.get(this.AUTH_SERVER + '/api/user/', { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }

  update(user: any, id: string): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.put(this.AUTH_SERVER + '/api/user/' + id, user, { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }

  delete(id: string): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.delete(this.AUTH_SERVER + '/api/user/' + id, { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }
}
