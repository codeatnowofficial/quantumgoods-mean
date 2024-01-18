import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-subcategoriesmain',
  templateUrl: './subcategoriesmain.component.html',
  styleUrls: ['./subcategoriesmain.component.css']
})
export class SubcategoriesmainComponent {
  message:any=""
  close:any=false
  categoryStatus: any
  subcategoryStatus:any
  subcategory:any
  allsubcategories:any
  category: any
  removesubcategorystatus:any
  confirm:any
  constructor(private service: ApiService) {
    this.getCategories()
    this.getsubcategories()
  }
  async getCategories() {
    this.categoryStatus = await this.service.getcategories()
    console.log(this.categoryStatus)
    this.category = this.categoryStatus.map((ele: any) => ele.category)
    console.log(this.category)
  }
  async onchange(data:any){
    console.log(data)
    this.subcategoryStatus = await this.service.getsubcategoryFromMainCategory(data)
    this.subcategory = this.subcategoryStatus.sub
  }
  async getsubcategories(){
    this.allsubcategories = await this.service.getallsub()
    console.log(this.allsubcategories)
  }
  async removesubcategory(data:any){
    this.confirm = confirm("are you sure you want to delete")
    if(this.confirm){
      this.removesubcategorystatus = await this.service.removesubcategory(data) 
      console.log(this.removesubcategorystatus)
      this.message="deleted succesfully"
      this.close = true
      this.getsubcategories()
    }
  }
  toastClose(){
    this.message = ""
    this.close = false
  }
}
