/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenInformationsService } from '../_services/token-informations.service';
import { RoleService } from '../_services/role.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.page.html',
  styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

  token: any;
  users: any;
  roles: any;

  constructor(private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private tokenInfosService: TokenInformationsService,
    private toastController: ToastController) { }

  async ngOnInit() {
    //this.getUsers();
    if (this.authService.isLog$.getValue()) {
      this.token = null;
      this.users = null;
      await Storage.get({ key: 'token' }).then(data => {
        if (data) {
          this.token = data.value;
          this.getUsers();
          this.getRoles();
        }
      });
    }
  }

  async getUsers() {
    //const dToken = this.tokenInfosService.getInfos(this.token);
    await this.userService.getAll().subscribe(data => {
      if (data) {
        //console.log(data);
        this.users = data;
        //console.log(this.users);
      }
    }, err => {
      console.log(err);
    });
  }

  async getRoles() {
    await this.roleService.getAll().subscribe(data => {
      if (data) {
        //console.log(data);
        this.roles = data;
        //console.log(this.roles);
      }
    }, err => {
      console.log(err);
    });
  }

  setModerator(user) {
    if (user.id_role.label !== 'MODERATOR') {
      this.userService.update({ id_role: '61ee8d0511037a8bd5d71f1e' }, user._id);
    }
  }

  async setAdmin(user) {}

  iconModColor(label) {
    if (label === 'MODERATOR') {
      return 'success';
    } else {
      return 'danger';
    }
  }

  iconAdminColor(label) {
    if (label === 'ADMIN') {
      return 'success';
    } else {
      return 'danger';
    }
  }
}
