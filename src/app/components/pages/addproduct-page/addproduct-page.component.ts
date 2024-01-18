import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addproduct-page',
  templateUrl: './addproduct-page.component.html',
  styleUrls: ['./addproduct-page.component.css']
})

export class AddproductPageComponent {
  categoryStatus: any
  addProuctStatus:any
  category: any
  subcategoryCheck: any
  subcategories: any
  addproductForm: FormGroup
  msg1: any
  close1: boolean = true
  url: any
  checkImg:boolean = false
  imageBlob:any
  checkData:any
  file_preview:any
  watchUrlToast:boolean = false
  loading:boolean = false
  constructor(private service: ApiService,private router:Router ,private form: FormBuilder) {
    this.url = "https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220"
    this.getCategories()
    this.getSubCategories()
    this.addproductForm = form.group({

      product_name: ['', Validators.required],
      product_price: ['', Validators.required],
      product_description: ['', Validators.required],
      product_category: ['', Validators.required],
      product_subcategory: [''],
      image: null,
      uid:localStorage.getItem('user')
    })
  }

  async getSubCategories(){
    
  }

  async addproduct_btn() {
    if(this.checkImg){
      if (this.addproductForm.valid) {
        this.loading = true
        this.msg1 = ""
        this.close1 = false
        this.watchUrlToast = false
        const formData = new FormData();

        Object.keys(this.addproductForm.value).forEach(key => {
          formData.append(key, this.addproductForm.value[key]);
          console.log("this is the value",this.addproductForm.value)
        });
        // this.checkData = {product_image:this.file,...this.addproductForm.value}
        // console.log("it is in addproductformvalid")
        console.log(formData)
        this.addProuctStatus = this.service.addProduct(formData).subscribe(
          response => {
            console.log(response
              )
            if(response.status == 1){
              this.msg1 = "Product Added Succesfully"
              this.close1 = true
              this.watchUrlToast = true
              this.addproductForm.reset()
              this.url = "https://tse3.mm.bing.net/th?id=OIP.4-LoTi4UsTIuYSqqIQ_PKwHaJ3&pid=Api&P=0&h=220"
              this.loading = false
            }
            if(response.status == 'invalid token'){
              this.router.navigate(['/'])
              localStorage.clear()
            }
            // Handle success
          },
          error => {
            
            console.error(error);
            // Handle error
          }
        );
      } else {
        this.close1 = true
        this.msg1 = "Product Not Valid..."
        this.watchUrlToast = false
        console.log(this.addproductForm.value)
      }
    }else{
      this.close1 = true
      this.watchUrlToast = false
      this.msg1 = "File Type Invalid"
    }
  }

  imageChange(event: any, controlName:any) {
    const file = event.target.files[0];
    this.addproductForm.patchValue({ [controlName]: file });
    console.log(this.addproductForm)
    console.log(controlName)
    let reader = new FileReader();
    let allowedMimeType = ["image/png", "image/jpg", "image/jpeg"]
    this.file_preview = event.target.files[0]
    console.log(this.file_preview)
    console.log(event.target.files[0].type)
    if (file && allowedMimeType.includes(event.target.files[0].type)) {
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (e: any) => {
        this.url = e.target.result
      }
      this.checkImg = true
    } else {
      this.close1 = true
      this.msg1 = "File does not match "
      this.checkImg = false
    }
    console.log(event.target.files[0].name)
    console.log(this.checkImg)
  }

  toastClose1() {
    this.msg1 = ""
    this.close1 = false
    this.watchUrlToast = false
    console.log(this.close1)
    console.log(this.msg1)
  }

  async getCategories() {
    this.categoryStatus = await this.service.getcategories()
    console.log(this.categoryStatus)
    this.category = this.categoryStatus.map((ele:any)=> ele.category)
  }

  async categoryChanged(e: any) {
    console.log(e.target.value)
    if (e.target.value.length) {
      this.subcategoryCheck = e.target.value
      this.subcategories = await this.service.getsubcategorybyname(this.subcategoryCheck)
      console.log(this.subcategories)
    }
  }
}