import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ComicsService } from 'src/app/services/comics.service';

@Component({
  selector: 'app-ver-user',
  templateUrl: './ver-user.component.html'
})
export class VerUserComponent implements OnInit {

  public noimagen : string = "https://i.pinimg.com/236x/de/e7/be/dee7be59143d99bfbf7755635642a16d--scary-movies-horror-movies.jpg";
  
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

  constructor(private comicsService: ComicsService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    if (params['id']) {      
      this.comicsService.getUser(params['id'])
      .subscribe(
        res => {
          this.user = res        
        },
        err => console.error(err)        
      );
    }    
  }
}
