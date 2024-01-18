import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, last, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  checked: any
  allproduct:any
  url:string = "https://quantumgoods-o8mj.onrender.com/"
  token = localStorage.getItem("token")
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  constructor(private http: HttpClient, private router: Router) {
  }
  async signup(data: any) {
    const status = await this.http.post(`{this.url}signup`, data).toPromise()
    console.log(20,status)
    return JSON.stringify(status)
  }
  async userslogin(data:any){
    console.log(20,data)
    const status = await this.http.post('http://localhost:4000/getusers', data).toPromise()
    console.log(22,status)
    return JSON.stringify(status)
  }
  async getcategories(){
    const status: any = await this.http.get('http://localhost:4000/categories',{ headers:this.headers }).toPromise()
    console.log(status)
    return status
  }

  addProduct(data:any): Observable<any>{
    console.log(20,data)
    return this.http.post('http://localhost:4000/addproduct', data,{headers:new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })})
    // console.log(22,status)
    // return JSON.stringify(status)
  }
  getAllProduct(): Observable<any>{
    return this.http.get('http://localhost:4000/allproduct',{ headers:this.headers })
    // console.log(22,status)
    // return JSON.stringify(status)
  }
  addCategories(data:any):Observable<any>{
    return this.http.post('http://localhost:4000/addcategories',data,{ headers:this.headers })
  }
  async removecategories(data:any){
    return await lastValueFrom(this.http.post('http://localhost:4000/removecategories',{id:data},{ headers:this.headers }))
  }
  async getCategoryById(data:any){
    const status=  await lastValueFrom(this.http.post('http://localhost:4000/getcategorybyid',{id:data},{ headers:this.headers }))
    return status
  }
  async updateCategory(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/updatecategory',data,{ headers:this.headers }))
    return status
  }
  async addsubcategory(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/addsubcategory',data,{ headers:this.headers }))
    return status
  }
  async getsubcategoryFromMainCategory(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/getsubcategoryFromCategory',{category:data},{ headers:this.headers }))
    return status
  }
  async getallsub(){
    const status = await lastValueFrom(this.http.get('http://localhost:4000/getallsub',{ headers:this.headers }))
    return status
  }
  async removesubcategory(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/removesubcategory',{_id:data},{ headers:this.headers }))
    return status
  }
  async updatesub(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/updatesub',data,{ headers:this.headers }))
    return status
  }
  async getsubFromId(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/getsubcategoriesfromid',{_id:data},{ headers:this.headers }))
    return status
  }
  async getsubcategorybyname(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/getsubcategoryfromname',{name:data},{ headers:this.headers }))
    return status
  }
  async getproductsbyid(data:any){
    console.log(data)
    const status = await lastValueFrom(this.http.post('http://localhost:4000/getproductsbyid',{_id:data},{ headers:this.headers }))
    return status
  }
  async forgotpassword(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/forgotpassword',{email:data},{headers:this.headers}))
    return status
  }
  async forgotpasswordupdate(data:any){
    const status = await lastValueFrom(this.http.post('http://localhost:4000/forgotpasswordupdate',data,{headers:this.headers}))
    return status
  }
} 
