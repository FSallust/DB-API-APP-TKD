import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { Storage } from '@capacitor/storage';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import jwt_decode from 'jwt-decode';
import { DecodeToken } from '../_models/decodeToken';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  token: any;
  photo: string;
  password: string;
  user: any;

  constructor(private authService: AuthService, private userService: UserService, private toastController: ToastController) {
  }

  async ngOnInit() {
    if (this.authService.isLog$.getValue()) {
      this.token = null;
      await Storage.get({ key: 'token' }).then(data => {
        if (data) {
          this.token = data.value;
          this.getUserInformations();
        }
      } );
    }
  }

  async getUserInformations() {
    const decodeToken = jwt_decode(this.token) as DecodeToken;
    //console.log(decodeToken);
    this.user = null;
    await this.userService.getOne(decodeToken.id).subscribe(data => {
      if (data) {
        //console.log(data);
        this.user = data;
        //console.log(this.user);
      }
    }, err => {console.log(err);
    });
  }
}
