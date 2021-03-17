import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../../services/list.service';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
    listForm: FormGroup;

  constructor(protected listService: ListService,
              protected fb: FormBuilder,
              private modalController: ModalController) {
    this.listForm = this.fb.group({
      listName: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onFormSubmit(){
    this.listService.createList(this.listForm.get('listName').value);
    this.modalController.dismiss();
  }
}
