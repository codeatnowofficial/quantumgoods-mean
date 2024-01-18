import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router){
    let user = localStorage.getItem('login')
    let auth = localStorage.getItem('user')
    if(user == 'false'){
      this.router.navigate(['/'])
    }
  }
}