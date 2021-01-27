import {Todo} from './todo';

export class List {
    static lastId = 0;
    id: number;
    name: string;
    todos: Todo[];


    constructor(name: string){
        this.id = List.lastId++;
        this.name = name;
        this.todos = [];
    };
}
