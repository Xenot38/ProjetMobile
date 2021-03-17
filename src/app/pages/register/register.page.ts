import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Todo} from '../../models/todo';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(protected fb: FormBuilder,
              protected auth: AngularFireAuth,
              public toastController: ToastController) {
    this.registerForm = this.fb.group({
      registerEmail: ['', Validators.required],
      registerPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onFormSubmit(){
    const registerEmail = this.registerForm.get('registerEmail').value;
    const registerPassword = this.registerForm.get('registerPassword').value;
    this.auth.createUserWithEmailAndPassword(registerEmail, registerPassword).catch(async error => {
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
