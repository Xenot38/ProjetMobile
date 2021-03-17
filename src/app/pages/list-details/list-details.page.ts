import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListService} from '../../services/list.service';
import {List} from '../../models/list';
import {Todo} from '../../models/todo';
import {ModalController} from '@ionic/angular';
import {CreateTodoComponent} from '../../modals/create-todo/create-todo.component';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {CreateListComponent} from '../../modals/create-list/create-list.component';
import {UserManagementComponent} from '../../modals/user-management/user-management.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  listId: string;
  list: List;
  todosCollection: AngularFirestoreCollection<Todo>;
  todosObservable: Observable<Todo[]>;
  constructor(public route: ActivatedRoute,
              public listService: ListService,
              public modalController: ModalController,
              public afs: AngularFirestore) {

  }

  ngOnInit() {
    this.listId = String(this.route.snapshot.paramMap.get('id'));
    this.list = this.listService.getOne(this.listId);
    this.todosCollection = this.afs.collection<List>('lists').doc(this.listId).collection<Todo>('todos');
    this.todosObservable = this.todosCollection.valueChanges();
    this.todosObservable.subscribe(todos => {
      this.list.todos = todos;
    });
  }

  deleteTodo(todo: Todo){
    this.listService.deleteTodo(this.listId, todo.id);
    // this.list.todos.splice(this.list.todos.indexOf(todo), 1);
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      cssClass: 'my-custom-class',
      componentProps: {list: this.list}
    });
    return await modal.present();
  }

  async openShareModal() {
    const modal = await this.modalController.create({
      component: UserManagementComponent,
      cssClass: 'my-custom-class',
      componentProps: {list: this.list}
    });
    return await modal.present();
  }
}
