import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  regForm: FormGroup;
  isSubmitted = false;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      lastname: [null, [Validators.required, Validators.minLength(2), Validators.pattern('^[A-zÀ-ú]+$')]],
      firstname: [null, [Validators.required, Validators.minLength(2), Validators.pattern('^[A-zÀ-ú]+$')]],
      birthdate: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9!@#$%^&*]{6,100}$')]],
      presences: [[]],
      photo: [''],
      qr: [''],
    });
  }

  getDate(e) {
    const date = new Date(e.target.value).toISOString().substring(0, 10);
    this.regForm.get('birthdate').setValue(date, {
      onlyself: true
    });
  }

  async submitForm() {
    const toastFormValid = await this.toastController.create({
      message: 'Inscription réussie!',
      duration: 2000,
      color: 'success'
    });
    const toastFormNotValid = await this.toastController.create({
      message: 'Champs non valides!',
      duration: 2000,
      color: 'danger'
    });

    this.isSubmitted = true;
    if (!this.regForm.valid) {
      console.log('Please provide all the required values!');
      toastFormNotValid.present();
      return false;
    } else {
      console.log(this.regForm.value);
      this.userService.create(this.regForm.value).subscribe();
      toastFormValid.present();
      this.router.navigate(['/login']);
    }
  }
}
