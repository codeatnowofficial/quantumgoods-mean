import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent {
message1:any =""
close1:any =""
subcategory!:FormGroup
categoryStatus:any
category:any
status:any

constructor(private form:FormBuilder,private service:ApiService,private router:Router){
  this.subcategory = form.group({
    category_name:['',[Validators.required]],
    subcategory_name:['',Validators.required]
  })
  this.getCategories()
}
async getCategories() {
  this.categoryStatus = await this.service.getcategories()
  console.log(this.categoryStatus)
  this.category = this.categoryStatus.map((ele:any)=> ele.category)
}

async addsubcategory(){
  console.log(this.subcategory)
  this.status = await this.service.addsubcategory(this.subcategory.value)
  console.log(this.status)
  if(this.status.status == 1){
    this.message1 = "Sub Categories Added Succesfully"
    this.close1 = true
  }
  if(this.status.status == 'invalid token'){
    this.router.navigate(['/'])
    localStorage.clear()
  }
}
toastClose(){
  this.message1 = ""
  this.close1 = false
}

}
