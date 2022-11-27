import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from 'src/app/models/Comic';
import { ComicsService } from 'src/app/services/comics.service';

@Component({
  selector: 'app-ver-comic',
  templateUrl: './ver-comic.component.html'
})
export class VerComicComponent implements OnInit {

  public noimagen : string = "https://i.pinimg.com/236x/de/e7/be/dee7be59143d99bfbf7755635642a16d--scary-movies-horror-movies.jpg";
  
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

  constructor(private comicsService: ComicsService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    if (params['id']) {      
      this.comicsService.getComic(params['id'])
      .subscribe(
        res => {
          this.comic = res        
        },
        err => console.error(err)        
      );
    }    
  }
}
