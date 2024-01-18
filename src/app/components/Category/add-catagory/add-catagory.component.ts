import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-catagory',
  templateUrl: './add-catagory.component.html',
  styleUrls: ['./add-catagory.component.css']
})

export class AddCatagoryComponent  {
  addCategory:FormGroup
  subCategory:any
  categories:any
  msg2:any
  close2:boolean=false
  constructor(private service:ApiService ,private router:Router,private form:FormBuilder){
    this.addCategory = this.form.group({
      category_name:['',Validators.required]
    })
  }
  



  addcategory(){
    // e.preventDefault()
    console.log("near function",this.addCategory.value)
    this.service.addCategories(this.addCategory.value).subscribe(
      {
        next:(response) =>{
          console.log(33,response)
          if(response.status == 1){
            this.msg2 = "Category Added Succesfully"
            this.close2 = true
            console.log("here")
          }
          if(response.status == 401){
            console.log(response);
            
            this.router.navigate(['/'])
            localStorage.clear()
          }
        },
        error:(error)=>{
          console.log(error)
          if(error.status == 401){
            console.log(error);
            this.router.navigate(['/'])
            localStorage.clear()
          }
        }
      }
    )
  }

  toastClose2(){
    this.msg2 = ""
    this.close2 = false
  }
}
