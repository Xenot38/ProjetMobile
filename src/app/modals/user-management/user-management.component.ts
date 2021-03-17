import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../../services/list.service';
import {IonCheckbox, ModalController} from '@ionic/angular';
import {List} from '../../models/list';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  @Input() list: List;
  userForm: FormGroup;
  constructor(protected listService: ListService,
              protected fb: FormBuilder,
              private modalController: ModalController,
              public afs: AngularFirestore) {
    this.userForm = this.fb.group({
      userMail: ['', Validators.required],
      userWrite: []
    });
  }

  ngOnInit() {}

  onFormSubmit(){
    const emailForm: string = this.userForm.get('userMail').value;
    let writePerm: boolean = this.userForm.get('userWrite').value;
    if (writePerm === null){
      writePerm = false;
    }
    if (writePerm){
      this.list.canWrite.push(emailForm);
      this.afs.collection<List>('lists').doc(this.list.id).update({canWrite: this.list.canWrite});
    }else{
      this.list.canRead.push(emailForm);
      this.afs.collection<List>('lists').doc(this.list.id).update({canRead: this.list.canRead});
    }
    this.modalController.dismiss();
  }
}
