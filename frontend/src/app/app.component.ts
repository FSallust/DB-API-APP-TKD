import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menu: any[];

  constructor(private menuCtrl: MenuController, private authService: AuthService) {
    this.authService.isLog$.subscribe(isLog => {
      if (isLog) {
        this.menu = [
          { title: 'Accueil', path: '/home', icon: 'home' },
          { title: 'Profil', path: '/profile', icon: 'person' },
          { title: 'Administration', path: '/administration', icon: 'ribbon' },
          { title: 'Déconnexion', path: '/logout', icon: 'log-out' },
        ];
      } else {
        this.menu = [
          { title: 'Accueil', path: '/home', icon: 'home' },
          { title: 'Connexion', path: '/login', icon: 'log-in' },
          { title: 'Enregistrement', path: '/registration', icon: 'person-add' },
        ];
      }
    });
  }

  collapse() {
    this.menuCtrl.close();
  }
}
