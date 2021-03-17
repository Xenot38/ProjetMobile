import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Todo} from '../../models/todo';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(protected fb: FormBuilder,
              protected auth: AngularFireAuth,
              protected router: Router,
              public loadingController: LoadingController,
              public toastController: ToastController)
  {
    this.loginForm = this.fb.group({
      loginEmail: ['', Validators.required],
      loginPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onFormSubmit() {
    const loginEmail = this.loginForm.get('loginEmail').value;
    const loginPassword = this.loginForm.get('loginPassword').value;
    const credentialPromise = this.auth.signInWithEmailAndPassword(loginEmail, loginPassword);
    this.presentLoading();
    credentialPromise.then(data => {
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
      this.loadingController.dismiss();
    });
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
