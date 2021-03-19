import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Todo} from '../../models/todo';
import {Router} from '@angular/router';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {CreateListComponent} from '../../modals/create-list/create-list.component';
import {ForgotPasswordComponent} from '../../modals/forgot-password/forgot-password.component';


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
              public toastController: ToastController,
              public modalController: ModalController)
  {
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onFormSubmit() {
    if (this.loginForm.valid){
      const loginEmail = this.loginForm.get('loginEmail').value;
      const loginPassword = this.loginForm.get('loginPassword').value;
      const credentialPromise = this.auth.signInWithEmailAndPassword(loginEmail, loginPassword);
      this.presentLoading();
      credentialPromise.then(data => {
        this.router.navigate(['/home']);
        location.reload();
        this.loadingController.dismiss();
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
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ForgotPasswordComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
