import {Todo} from './todo';

export class List {
    id: string;
    name: string;
    todos?: Todo[];
    owner: string;
    canRead?: string[];
    canWrite?: string[];

    constructor(id: string, name: string, owner: string){
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.canRead = [];
        this.canWrite = [];
    }
}
