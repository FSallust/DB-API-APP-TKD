import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  async logIn() {
    //toast to
    const toast = await this.toastController.create({
      message: 'Connexion réussie!',
      duration: 2000,
      color: 'success'
    });

    //save token in storage
    this.authService.login({ email: this.email, password: this.password }).subscribe(data => {
      console.log(data);
      if (data) {
        if (data.accessToken) {
          this.authService.isLog$.next(true);
          Storage.set({ key: 'token', value: data.accessToken });
          //show token
          toast.present();
          this.router.navigate(['/home']);
        }
      }
    }, e => {
      console.log(e);
      this.authService.isLog$.next(false);
      toast.message = 'Connexion échouée!';
      toast.color = 'danger';
      toast.present();
    });
  }

}
