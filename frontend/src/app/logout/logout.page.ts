import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authService: AuthService, private toastController: ToastController) {
    this.logOut();
  }

  ngOnInit() {
  }

  async logOut() {
    const toast = await this.toastController.create({
      message: 'Déconnexion!',
      duration: 2000,
      color: 'primary'
    });
    this.authService.logout();
    toast.present();
  }

}
