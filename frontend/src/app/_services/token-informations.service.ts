import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DecodeToken } from '../_models/decodeToken';

@Injectable({
  providedIn: 'root'
})
export class TokenInformationsService {

  constructor() { }

  getInfos(token) {
    const decodeToken = jwt_decode(token) as DecodeToken;
    //console.log(decodeToken);
    return decodeToken;
  }
}
