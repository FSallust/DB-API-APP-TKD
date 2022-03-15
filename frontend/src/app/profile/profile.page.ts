import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { Storage } from '@capacitor/storage';
import { UserService } from '../_services/user.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { TokenInformationsService } from '../_services/token-informations.service';

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
  user: any = null;
  source = null;

  private baseOptions: CameraOptions = {
    destinationType: 0,
    quality: 20
  };

  constructor(private authService: AuthService,
              private userService: UserService,
              private tokenInfosService: TokenInformationsService,
              private toastController: ToastController,
              private camera: Camera) { }

  async ngOnInit() {
    if (this.authService.isLog$.getValue()) {
      this.token = null;
      this.user = null;
      await Storage.get({ key: 'token' }).then(data => {
        if (data) {
          this.token = data.value;
          this.getUserInformations();
        }
      });
    }
  }

  async getUserInformations() {
    const dToken = this.tokenInfosService.getInfos(this.token);
    await this.userService.getOne(dToken.id).subscribe(data => {
      if (data) {
        //console.log(data);
        this.user = data;
        //console.log(this.user);
      }
    }, err => {
      console.log(err);
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
    const dToken = this.tokenInfosService.getInfos(this.token);
    await this.userService.update({ photo: result }, dToken.id).subscribe(data => {
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
      ...this.baseOptions,
      sourceType: 0
    }).then((result) => this.savePic(result));
  }
}
