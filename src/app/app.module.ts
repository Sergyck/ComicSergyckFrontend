import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { ComicFormComponent } from './components/comics/comic-form/comic-form.component';
import { ComicListComponent } from './components/comics/comic-list/comic-list.component';
import { VerComicComponent } from './components/comics/ver-comic/ver-comic.component';

import { UserFormComponent } from './components/users/user-form/user-form.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { VerUserComponent } from './components/users/ver-user/ver-user.component';

import { ComicsService } from './services/comics.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ComicFormComponent,
    ComicListComponent,
    VerComicComponent,
    UserFormComponent,
    UserListComponent,
    VerUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ComicsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
