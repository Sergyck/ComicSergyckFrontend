import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComicsService } from '../../../services/comics.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  users: any = [];
  public mensaje: string = "";
  public mostrarMensaje: boolean = false;

  constructor(private comicsService: ComicsService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.comicsService.getUsers().subscribe(
      res => {
        this.users = res
      },
      err => console.error(err)   
    );
  }

  deleteUser(idUser: string, user:any){
    if (confirm(`Confirmas la eliminación del usuario ${user.name} ?`)) {
      console.log("Si eliminación");
      this.comicsService.deleteUser(idUser).subscribe(
        (res : any) => {
          console.log(res);
          this.mensaje = res.message
          this.mostrarMensaje = true;
          /*this.router.navigate(['/users', this.mensaje], { skipLocationChange : true })*/
        },
        (err : any) => console.error(err)
      );
    } else {
      console.log("No eliminación");
    }
  }

  cerrarAlert(){
    this.mostrarMensaje = false;
    this.mensaje = "";
    this.getUsers();
  }

  navegarCrearUser(){
    this.router.navigate(['users/add']);
  }

  navegarVerUser(id: string){
    this.router.navigate([`users/view`, id], { skipLocationChange : true });
  }

  navegarEditarUser(id: string){
    this.router.navigate([`users/edit`, id], { skipLocationChange : true });
  }
  
}
