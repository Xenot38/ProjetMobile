import { Injectable } from '@angular/core';
import {List} from '../models/list';
import {Todo} from '../models/todo';
import {MenuController} from '@ionic/angular';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  userEmail: string;
  lists: List[];
  listsCollection: AngularFirestoreCollection<List>;
  listsObservable: Observable<List[]>;
  constructor(public afs: AngularFirestore,
              protected auth: AngularFireAuth) {
    this.listsCollection = afs.collection<List>('lists');
    this.listsObservable = this.listsCollection.valueChanges();
    this.auth.user.subscribe( user => {
      if (user !== null){
        this.userEmail = user.email;
      }
      this.listsObservable.subscribe((lists) => {
        lists.forEach(listLoop => {
          if (listLoop.todos === undefined){
            listLoop.todos = [];
          }
          if (listLoop.canRead === undefined){
            listLoop.canRead = [];
          }
          if (listLoop.canWrite === undefined){
            listLoop.canRead = [];
          }
        });
        this.lists = lists.filter((list) => {
          // tslint:disable-next-line:max-line-length
          return list.owner === this.userEmail || list.canRead.indexOf(this.userEmail) !== -1 || list.canWrite.indexOf(this.userEmail) !== -1;
        });
      });
    });
  }

  public getAll(){
    return this.listsObservable;
  }

  public getOne(id: string) {
    return this.lists.find(list => list.id === id);
  }

  public createList(name: string){
    // Persist a document id
    const id = this.afs.createId();
    const owner = this.userEmail;
    const canRead = [];
    const canWrite = [];
    const list: List = { id, name , owner, canRead, canWrite};
    this.listsCollection.doc(id).set(list);
  }

  public deleteList(list: List){
    this.listsCollection.doc(list.id).delete();
  }

  public addTodo(listId: string, todoName: string, todoDesc: string){
    const id = this.afs.createId();
    const todo: Todo = { id, name: todoName, description: todoDesc, isDone: false};
    this.listsCollection.doc(listId).collection<Todo>('todos').doc(id).set(todo);
  }

  public deleteTodo(idList: string, idTodo: string){
    this.afs.collection<List>('lists').doc(idList).collection<Todo>('todos').doc(idTodo).delete();
  }

}
