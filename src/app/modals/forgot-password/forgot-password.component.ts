import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ModalController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotPwdForm: FormGroup;
  constructor(protected auth: AngularFireAuth,
              private modalController: ModalController,
              public toastController: ToastController,
              protected fb: FormBuilder) {
    this.forgotPwdForm = this.fb.group({
      forgotEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  async onFormSubmit() {
    const forgotEmail = this.forgotPwdForm.get('forgotEmail').value;
    this.auth.sendPasswordResetEmail(forgotEmail).then(async data => {
      const toast = await this.toastController.create({
        message: 'A password reset email has been sent to ' + forgotEmail ,
        duration: 4000,
        color: 'success'
      });
      await toast.present();
      await this.modalController.dismiss();
    }).catch(async error => {
      const toastError = await this.toastController.create({
        message: error.message,
        duration: 4000,
        color: 'warning'
      });
      toastError.present();
    });

  }
}
