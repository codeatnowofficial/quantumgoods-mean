import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent {
  id:any = ""
  status:any
  categoryStatus:any
  category:any
  object:any = {
    _id:'',
    cat:''
  }
  message:any =""
  close:any=false
  constructor(private router:Router,private http:ApiService){
    this.id=this.router.routerState.snapshot.url.split('/')[4]
    this.getCategoryById()
  }
  async getCategoryById(){
    this.status = await this.http.getCategoryById(this.id)
    this.category = this.status.category 
  }
  async updateCategory(cat:any,e:any){
    try {
      
    
    e.preventDefault()
    this.object._id=this.id
    this.object.cat=cat
    console.log(this.object)
    this.categoryStatus = await this.http.updateCategory(this.object)
    console.log(this.categoryStatus)
    if(this.categoryStatus.status == 1){
      this.message="Catagory Updated Succesfully"
      this.close = true
    }
    
  } catch (error) {
    if(this.categoryStatus.error.status == 'invalid token'){
      this.router.navigate(['/'])
      localStorage.clear()
    }  
  }
  }
  toastClose4(){
    this.message = ""
    this.close=false
  }
}
