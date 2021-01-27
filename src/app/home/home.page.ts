import { Component, OnInit } from '@angular/core';
import {ListService} from '../services/list.service';
import {List} from '../models/list';
import { ModalController } from '@ionic/angular';
import {CreateListComponent} from '../modals/create-list/create-list.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  todoLists: List[];

  constructor(protected listService: ListService, public modalController: ModalController) {}

  ngOnInit(){
    this.todoLists = this.listService.getAll();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then(data => {
      this.todoLists = this.listService.getAll();
    });
    return await modal.present();
  }

  deleteList(list: List){
    this.listService.deleteList(list);
  }
}
