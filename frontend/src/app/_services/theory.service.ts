/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TheoryService {

  constructor(private httpClient: HttpClient) { }

  // getOne(id: string): Observable<any> {
  //   return from(Storage.get({ key: 'token' })).pipe(mergeMap((token) =>
  //     this.httpClient.get(environment.apiUrl + '/api/theory/' + id, { headers: { Authorization: 'Bearer ' + token.value } })
  //   ));
  // }

  getAll(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/api/theory/');
  }
}
