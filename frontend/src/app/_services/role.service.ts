/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Storage } from '@capacitor/storage';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private authservice: AuthService, private httpClient: HttpClient) { }

  getOne(id: string): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.get(environment.apiUrl + '/api/role/' + id, { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }

  getAll(): Observable<any> {
    return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
      this.httpClient.get(environment.apiUrl + '/api/role/', { headers: { Authorization: 'Bearer ' + token.value } })
    ));
  }
}
