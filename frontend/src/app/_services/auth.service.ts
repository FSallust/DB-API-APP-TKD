import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLog$: BehaviorSubject<boolean>;
  user: User = null;


  constructor(private httpClient: HttpClient, private router: Router) {
    if (this.isLog$ === undefined) {
      this.isLog$ = new BehaviorSubject(false);
    }
    Storage.get({key:'token'}).then(token => {
      if(token.value){
        this.isLog$.next(true);
      }
    });
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/login', user);
  }

  logout() {
    //delete token
    Storage.clear();
    this.isLog$.next(false);
    //redirect to home
    this.router.navigate(['/home']);
  }
}
