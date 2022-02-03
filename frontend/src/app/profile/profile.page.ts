import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { Storage } from '@capacitor/storage';
import { UserService } from '../_services/user.service';
import jwt_decode from 'jwt-decode';
import { DecodeToken } from '../_models/decodeToken';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [Camera]
})
export class ProfilePage implements OnInit {

  token: any;
  photo: string;
  password: string;
  user: any;
  source = null;

  private baseOptions: CameraOptions = {
    destinationType: 0,
    quality: 20
  };

  constructor(private authService: AuthService,
              private userService: UserService,
              private toastController: ToastController,
              private camera: Camera) {}

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

  takePic() {
    this.camera.getPicture(this.baseOptions).then((result) => this.savePic(result));
  }

  async savePic(result) {
    //console.log(photo);
    const toast = await this.toastController.create({
      message: 'Photo modifiée!',
      duration: 2000,
      color: 'success'
    });
    const decodeToken = jwt_decode(this.token) as DecodeToken;
    await this.userService.update({photo: result}, decodeToken.id).subscribe(data => {
      if (data) {
        toast.present();
        this.getUserInformations();
      }
    }, err => {
      toast.message = 'Erreur lors de la modification!';
      toast.color = 'danger';
      toast.present();
      console.log(err);
    });
  }

  async uploadPic() {
    this.camera.getPicture({
      sourceType: 0,
      ...this.baseOptions
    }).then((result) => this.savePic(result));
  }
}
