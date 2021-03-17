import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Todo} from '../../models/todo';
import {ListService} from '../../services/list.service';
import {List} from '../../models/list';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  listId: string;
  todoId: string;
  todo: Todo;
  todoName: string;
  todoDesc: string;

  constructor(public route: ActivatedRoute,
              public listService: ListService,
              public afs: AngularFirestore) { }

  ngOnInit() {
    this.listId = String(this.route.snapshot.paramMap.get('listId'));
    this.todoId = String(this.route.snapshot.paramMap.get('todoId'));
    this.todo = this.listService.getOneTodo(this.listId, this.todoId);
    this.todoName = this.todo.name;
    this.todoDesc = this.todo.description;
  }

  updateName() {
    this.afs.collection<List>('lists').doc(this.listId).collection<Todo>('todos').doc(this.todoId).update({name : this.todoName});
  }

  updateDescription() {
    this.afs.collection<List>('lists').doc(this.listId).collection<Todo>('todos').doc(this.todoId).update({description : this.todoDesc});
  }
}
