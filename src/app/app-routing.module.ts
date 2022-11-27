import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicListComponent } from './components/comics/comic-list/comic-list.component';
import { ComicFormComponent } from './components/comics/comic-form/comic-form.component';
import { VerComicComponent } from './components/comics/ver-comic/ver-comic.component';

import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { VerUserComponent } from './components/users/ver-user/ver-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/comics',
    pathMatch: 'full'
  },
  {
    path: 'comics',
    component: ComicListComponent
  },
  {
    path: 'comics/add',
    component: ComicFormComponent
  },
  {
    path: 'comics/edit/:id',
    component: ComicFormComponent
  },
  {
    path: 'comics/view/:id',
    component: VerComicComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/add',
    component: UserFormComponent
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent
  },
  {
    path: 'users/view/:id',
    component: VerUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
