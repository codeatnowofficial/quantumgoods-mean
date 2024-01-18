import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editsubcategory',
  templateUrl: './editsubcategory.component.html',
  styleUrls: ['./editsubcategory.component.css']
})
export class EditsubcategoryComponent {
  id:any
  status:any
  message:any =""
  close:any = false
  constructor(private service:ApiService,private router:Router){
    this.id=this.router.routerState.snapshot.url.split('/')[4]
    this.getsubcategoryonId()
  }
  async updatesubcategory(e:any,data:any){
    e.preventDefault()
    console.log(data)
    const object = {
      _id:this.id,
      subcategory:data
    }
    this.status = await this.service.updatesub(object)    
    console.log(this.status)
    this.message = "data updated succesfully"
    this.close = true
  }
  toastClose(){
    this.message = ""
    this.close = false
  }
  getsubcategoryonId(){
    
  }
}
