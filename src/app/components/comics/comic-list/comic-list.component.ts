import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComicsService } from '../../../services/comics.service';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html'
})
export class ComicListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  comics: any = [];
  imagenXDefecto : string = "https://i.pinimg.com/236x/de/e7/be/dee7be59143d99bfbf7755635642a16d--scary-movies-horror-movies.jpg";
  public mensaje: string = "";
  public mostrarMensaje: boolean = false;

  constructor(private comicsService: ComicsService, private router: Router) { }

  ngOnInit(): void {
    this.getComics();
  }

  getComics(){
    this.comicsService.getComics().subscribe(
      res => {
        this.comics = res
      },
      err => console.error(err)   
    );
  }

  deleteComic(idComic: string, comic:any){
    if (confirm(`Confirmas la eliminación del comic ${comic.nameComic} ?`)) {
      console.log("Si eliminación");
      this.comicsService.deleteComic(idComic).subscribe(
        (res : any) => {
          console.log(res);
          this.mensaje = res.message
          this.mostrarMensaje = true;
          this.router.navigate(['/comics', this.mensaje], { skipLocationChange : true })
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
    this.getComics();
  }

  navegarCrearComic(){
    this.router.navigate(['comics/add']);
  }

  navegarVerComic(id: string){
    this.router.navigate([`comics/view`, id], { skipLocationChange : true });
  }

  navegarEditarComic(id: string){
    this.router.navigate([`comics/edit`, id], { skipLocationChange : true });
  }
  
}
