export class Todo {
    static lastId = 0;
    id: number;
    name: string;
    description: string;
    isDone: boolean;

    constructor(name: string, desc: string){
        this.id = Todo.lastId++;
        this.name = name;
        this.description = desc;
        this.isDone = false;
    }
}
