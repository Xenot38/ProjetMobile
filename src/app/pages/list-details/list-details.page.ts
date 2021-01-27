import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListService} from '../../services/list.service';
import {List} from '../../models/list';
import {Todo} from '../../models/todo';
import {ModalController} from '@ionic/angular';
import {CreateTodoComponent} from '../../modals/create-todo/create-todo.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  listId: number;
  list: List;
  constructor(public route: ActivatedRoute, public listServicce: ListService, public modalController: ModalController) { }

  ngOnInit() {
    this.listId = Number(this.route.snapshot.paramMap.get('id'));
    this.list = this.listServicce.getOne(this.listId);
  }

  deleteTodo(todo: Todo){
    this.list.todos.splice(this.list.todos.indexOf(todo), 1);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      cssClass: 'my-custom-class',
      componentProps: {list: this.list}
    });
    return await modal.present();
  }
}
