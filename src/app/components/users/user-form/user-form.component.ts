import { Component, HostBinding, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { ActivatedRoute, Router } from '@angular/router';

import { ComicsService } from '../../../services/comics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  public gestionarUserForm: FormGroup;
  public imagenXDefecto : string = "https://i.pinimg.com/236x/de/e7/be/dee7be59143d99bfbf7755635642a16d--scary-movies-horror-movies.jpg";
  public validoFormulario: boolean = false;
  public mostrarMensaje: boolean = false;
  public mensaje: string = "";

  @HostBinding('class') classes = 'row';

  public user: User = {
    id: 0,
    document: 0,
    name: '',
    lastname: '',
    email: '',
    phone: 0,
    username: '',
    password: '',
    user_status: true,
  };

  public edit: boolean = false;

  constructor(private comicsService: ComicsService, private router: Router, private activeRoute: ActivatedRoute , private formBuilder: FormBuilder) { 
    this.gestionarUserForm = this.formBuilder.group({
      document: [null, Validators.required],
      name: [null, [Validators.required, Validators.minLength(3)]],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null],
      username: [null, Validators.required],
      password: [null, Validators.required],
      user_status: true,
      _id: [null]
    });
  }

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    if (params['id']) {      
      this.comicsService.getUser(params['id'])
      .subscribe(
        res => {
          console.log(res);
          
          this.user = res,
          //delete this.comic.amount,
          //delete this.comic.lastSaleDate,
          delete this.user.createdAt,
          delete this.user.updatedAt,
          delete this.user.__v,
          //delete this.comic.exitoso,
          //delete this.comic.mensajeEjecucion,
          this.edit = true,
          this.gestionarUserForm.setValue(this.user);          
        },
        err => console.error(err)        
      );
    }    
  }

  guardar(){
    this.validoFormulario = true;
  }

  saveNewUser() {
    // delete this.game.id;
    // delete this.game.created_at;
    if (this.gestionarUserForm.invalid) {
      this.validoFormulario = true;
      return;
    }

    this.user = this.gestionarUserForm.value;
    //delete this.comic.amount,
    //delete this.comic.lastSaleDate,
    delete this.user.createdAt,
    delete this.user.updatedAt,
    delete this.user.__v,
    //delete this.comic.exitoso,
    //delete this.comic.mensajeEjecucion,

    this.comicsService.saveUser(this.user)
    .subscribe(
      ( res : any ) => {
        console.log(res);
        this.mensaje = res.message;
        this.mostrarMensaje = true;
      },
      err => console.error(err)      
    );
  }

  updateUser(){
    //delete this.game.created_at;

    if (this.gestionarUserForm.invalid) {
      this.validoFormulario = true;
      return;
    }

    this.user = this.gestionarUserForm.value;
    delete this.user.id,
    delete this.user._id,
    delete this.user.user_status,
    delete this.user.exitoso,
    delete this.user.mensajeEjecucion,
    console.log(this.user);
    
    const params = this.activeRoute.snapshot.params;
    this.comicsService.updateUser(params['id'], this.user)
    .subscribe(
      res => {
        console.log(res),
        this.router.navigate(['/users'])    
      },
      err => console.error(err)      
    );
  }

  public fc(field : string): any{
    const fieldName = this.gestionarUserForm.get(field);
    return fieldName?.touched ||(fieldName?.dirty && fieldName?.invalid);
  }

  public f(field : string): any{
    return this.gestionarUserForm.get(field);
  }

  cerrarAlert(){
    this.mostrarMensaje = false;
    this.mensaje = "";
    this.router.navigate(['users']);
  }

}
