import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe : redirectToLogin}
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/list-details/:listId',
    loadChildren: () => import('./pages/list-details/list-details.module').then( m => m.ListDetailsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe : redirectToLogin}
    },
  {
    path: 'home/list-details/:listId/todo-details/:todoId',
    loadChildren: () => import('./pages/todo-details/todo-details.module').then(m => m.TodoDetailsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe : redirectToLogin}
    },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe : redirectToHome}
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe : redirectToHome}
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
