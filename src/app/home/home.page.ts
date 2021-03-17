import { Component, OnInit } from '@angular/core';
import {ListService} from '../services/list.service';
import {List} from '../models/list';
import {LoadingController, MenuController, ModalController} from '@ionic/angular';
import {CreateListComponent} from '../modals/create-list/create-list.component';
import {FormBuilder} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  todoLists: List[];
  userEmail: string;
  userLogin: Subscription;

  // TODO finir le partage et les permissions/ auth google, email validation

  constructor(protected listService: ListService,
              public modalController: ModalController,
              protected auth: AngularFireAuth,
              protected router: Router,
              protected menu: MenuController,
              public afs: AngularFirestore
              ) {
    this.userLogin = this.auth.user.subscribe( user => {
      if (user !== null){
        this.userEmail = user.email;
      }
      this.listService.getAll().subscribe((lists) => {
        this.todoLists = lists;
        this.todoLists.forEach(listLoop => {
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
        this.todoLists = this.todoLists.filter((list) => {
          // tslint:disable-next-line:max-line-length
          return list.owner === this.userEmail || list.canRead.indexOf(this.userEmail) !== -1 || list.canWrite.indexOf(this.userEmail) !== -1;
        });
      });
    });
  }


  ngOnInit(){
  }

  // Presents the list creation Modal
  async presentModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  deleteList(list: List){
    this.listService.deleteList(list);
  }

  logout(){
    const logoutPromise = this.auth.signOut();
    this.userLogin.unsubscribe();
    this.router.navigate(['/login']);
    this.menu.close();
  }


}
