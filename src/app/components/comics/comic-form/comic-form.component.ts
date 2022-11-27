import { Component, HostBinding, OnInit } from '@angular/core';
import { Comic } from '../../../models/Comic';
import { ActivatedRoute, Router } from '@angular/router';

import { ComicsService } from '../../../services/comics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comic-form',
  templateUrl: './comic-form.component.html'
})
export class ComicFormComponent implements OnInit {

  public gestionarComicForm: FormGroup;
  public imagenXDefecto : string = "https://i.pinimg.com/236x/de/e7/be/dee7be59143d99bfbf7755635642a16d--scary-movies-horror-movies.jpg";
  public validoFormulario: boolean = false;
  public mostrarMensaje: boolean = false;
  public mensaje: string = "";

  @HostBinding('class') classes = 'row';

  public comic: Comic = {
    id: 0,
    nameComic: '',
    editorial: '',
    topic: '',
    collections: '',
    pages: 0,
    price: 0,
    autors: '',
    color: true,
    lastSaleDate: new Date(),
    status: true,
    amount: 0,
    url_img: ''
  };

  public edit: boolean = false;

  constructor(private comicsService: ComicsService, private router: Router, private activeRoute: ActivatedRoute , private formBuilder: FormBuilder) { 
    this.gestionarComicForm = this.formBuilder.group({
      nameComic: [null, [Validators.required, Validators.minLength(3)]],
      editorial: [null, Validators.required],
      topic: [null, Validators.required],
      collections: [null],
      pages: [null, Validators.required],
      price: [null, Validators.required],
      autors: [null],
      color: [true],
      url_img: [''],
      status: [true],
      amount: [null],
      _id: [null]
    });
  }

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    if (params['id']) {      
      this.comicsService.getComic(params['id'])
      .subscribe(
        res => {
          this.comic = res,
          //delete this.comic.amount,
          delete this.comic.lastSaleDate,
          delete this.comic.createdAt,
          delete this.comic.updatedAt,
          delete this.comic.__v,
          delete this.comic.exitoso,
          delete this.comic.mensajeEjecucion,
          this.edit = true,
          this.gestionarComicForm.setValue(this.comic);          
        },
        err => console.error(err)        
      );
    }    
  }

  guardar(){
    this.validoFormulario = true;
  }

  saveNewComic() {
    // delete this.game.id;
    // delete this.game.created_at;
    if (this.gestionarComicForm.invalid) {
      this.validoFormulario = true;
      return;
    }

    this.comic = this.gestionarComicForm.value;
    //delete this.comic.amount,
    delete this.comic.lastSaleDate,
    delete this.comic.createdAt,
    delete this.comic.updatedAt,
    delete this.comic.__v,
    delete this.comic.exitoso,
    delete this.comic.mensajeEjecucion,

    this.comicsService.saveComic(this.comic)
    .subscribe(
      ( res : any ) => {
        console.log(res);
        this.mensaje = res.message;
        this.mostrarMensaje = true;
      },
      err => console.error(err)      
    );
  }

  updateComic(){
    //delete this.game.created_at;

    if (this.gestionarComicForm.invalid) {
      this.validoFormulario = true;
      return;
    }

    this.comic = this.gestionarComicForm.value;
    //delete this.comic.amount,
    delete this.comic.lastSaleDate,
    delete this.comic.exitoso,
    delete this.comic.mensajeEjecucion,

    this.comicsService.updateComic(this.comic.id, this.comic)
    .subscribe(
      res => {
        console.log(res),
        this.router.navigate(['/comics'])    
      },
      err => console.error(err)      
    );
  }

  public fc(field : string): any{
    const fieldName = this.gestionarComicForm.get(field);
    return fieldName?.touched ||(fieldName?.dirty && fieldName?.invalid);
  }

  public f(field : string): any{
    return this.gestionarComicForm.get(field);
  }

  cerrarAlert(){
    this.mostrarMensaje = false;
    this.mensaje = "";
    this.router.navigate(['comics']);
  }

}
