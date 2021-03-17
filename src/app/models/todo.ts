export class Todo {
    id: string;
    name: string;
    description: string;
    isDone: boolean;

    constructor(id: string, name: string, desc: string, isDone: boolean){
        this.id = id;
        this.name = name;
        this.description = desc;
        this.isDone = isDone;
    }
}
