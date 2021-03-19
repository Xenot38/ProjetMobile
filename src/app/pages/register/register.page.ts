import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Todo} from '../../models/todo';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(protected fb: FormBuilder,
              protected auth: AngularFireAuth,
              public toastController: ToastController,
              public loadingController: LoadingController,
              protected router: Router) {
    this.registerForm = this.fb.group({
      registerEmail: ['', [Validators.required, Validators.email]],
      registerPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onFormSubmit() {
    if (this.registerForm.valid) {
      const registerEmail = this.registerForm.get('registerEmail').value;
      const registerPassword = this.registerForm.get('registerPassword').value;
      this.presentLoading();
      this.auth.createUserWithEmailAndPassword(registerEmail, registerPassword).then(data => {
        this.loadingController.dismiss();
        this.router.navigate(['/home']);
      }).catch(async error => {
        const toast = await this.toastController.create({
          message: error.message,
          duration: 4000,
          color: 'warning'
        });
        switch (error.code) {
          case 'auth/invalid-email': {
            toast.message = 'This email format is invalid',
                toast.present();
            break;
          }
          case 'auth/user-not-found': {
            toast.message = 'This user does not exist',
                toast.present();
            break;
          }
          default: {
            toast.present();
            break;
          }
        }
      });
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}
