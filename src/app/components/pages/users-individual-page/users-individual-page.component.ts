import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users-individual-page',
  templateUrl: './users-individual-page.component.html',
  styleUrls: ['./users-individual-page.component.css']
})
export class UsersIndividualPageComponent {
  products:any
  id = localStorage.getItem('user')
  loading:boolean = true
  constructor(private http:ApiService){
    console.log(this.id)
    this.getproducts()
  }
  async getproducts(){
    this.products = await this.http.getproductsbyid(this.id)
    if(this.products){
      this.loading=false
    }
  }
}
