import { Injectable } from '@angular/core';
import {List} from '../models/list';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  lists: List[];

  constructor() {
    this.lists = [new List('test')];
  }

  public getAll(){
    return this.lists;
  }

  public getOne(id: number) {
    return this.lists.find(list => list.id === id);
  }
  public createList(name: string){
    const newList = new List(name);
    this.lists.push(newList);
  }

  public deleteList(list: List){
    this.lists.splice(this.lists.indexOf(list), 1);
  }
  public addTodo(id: number, todo: Todo){
    this.lists.find(list => list.id === id).todos.push(todo);
  }

  public deleteTodo(idList: number, idTodo: number){
    const list = this.lists.find(l => l.id === idList);
    const todo = list.todos.find(t => t.id === idTodo);
    // TODO a finir de delete le todo
  }

}
