import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../../services/list.service';
import {ModalController} from '@ionic/angular';
import {List} from '../../models/list';
import {Todo} from '../../models/todo';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  @Input() list: List;

  todoForm: FormGroup;

  constructor(protected listService: ListService, protected fb: FormBuilder, private modalController: ModalController) {
    this.todoForm = this.fb.group({
      todoName: ['', Validators.required],
      todoDesc: ['']
    });
  }

  ngOnInit() {}

  onFormSubmit(){
    const todoName = this.todoForm.get('todoName').value;
    const todoDesc = this.todoForm.get('todoDesc').value;
    this.listService.addTodo(this.list.id, todoName, todoDesc);
    this.modalController.dismiss();
  }
}
