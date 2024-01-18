import { Component } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  img: any = "https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220"
  products: any
  categories: any
  computerProducts: any
  autommativeProducts: any
  houseHoldProducts: any
  obj: any = {}

  constructor(private http: ApiService) {
    this.callAll()
  }

  async callAll() {
    await this.getcategories()
     this.getAllProducts()
  }
  
  getAllProducts() {
    const cat = Object.keys(this.obj)
    this.products = this.http.getAllProduct().subscribe(((result: any) => result.map((ele: any) => {
      if (cat.includes(ele.product_category)) {
        this.obj[ele.product_category].push(ele)
      }
    }))
    )

  }

  async getcategories() {
    this.categories = await this.http.getcategories()
    this.categories.map(async (ele: any) => {
      this.obj[await ele.category] = []
    })
  }
}