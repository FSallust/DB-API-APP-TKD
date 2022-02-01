import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLog$: BehaviorSubject<boolean>;
  user: User = null;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  AUTH_SERVER = 'http://127.0.0.1:5400';

  constructor(private httpClient: HttpClient, private router: Router) {
    if (this.isLog$ === undefined) {
      this.isLog$ = new BehaviorSubject(false);
    }
  }

  login(user: any): Observable<any> {
    return this.httpClient.post(this.AUTH_SERVER + '/api/login', user);
  }

  logout() {
    //delete token
    Storage.clear();
    this.isLog$.next(false);
    //redirect to home
    this.router.navigate(['/home']);
  }
}
