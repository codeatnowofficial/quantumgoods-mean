import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-remove-category',
  templateUrl: './remove-category.component.html',
  styleUrls: ['./remove-category.component.css']
})
export class RemoveCategoryComponent {
  dtTrigger: Subject<any> = new Subject<any>();
  categoriesArray: any
  categories: any
  id = 0
  status: any
  msg3: any
  close3: boolean = false
  constructor(private service: ApiService,private router:Router, private form: FormBuilder) {
    this.getcategories()
  }
  async getcategories() {
    this.categoriesArray = await this.service.getcategories()
    console.log(this.categoriesArray)
    // this.categories = this.categoriesArray.map((ele:any)=> ele.category)
  }

  toastClose3() {
    this.msg3 = ""
    this.close3 = false
    this.getcategories()
  }

  async removeCategory(id: any) {
    const check = confirm("are You sure you want to delete")
    if (check) {

      console.log(id)
      this.msg3 = ""
      this.close3 = false
      this.status = await this.service.removecategories(id)
      console.log(this.status)
      if (this.status.status == 1) {
        this.msg3 = "Category Deleted Succesfully..."
        this.close3 = true
      }
      if(this.status.status == 'invalid token'){
        this.router.navigate(['/'])
        localStorage.clear()
      }
    }
  }
}