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
    const status = await this.http.post(`${this.url}signup`, data).toPromise()
    console.log(20,status)
    return JSON.stringify(status)
  }
  async userslogin(data:any){
    console.log(20,data)
    const status = await this.http.post(`${this.url}getusers`, data).toPromise()
    console.log(22,status)
    return JSON.stringify(status)
  }
  async getcategories(){
    const status: any = await this.http.get(`${this.url}categories`,{ headers:this.headers }).toPromise()
    console.log(status)
    return status
  }

  addProduct(data:any): Observable<any>{
    console.log(20,data)
    return this.http.post(`${this.url}addproduct`, data,{headers:new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })})
    // console.log(22,status)
    // return JSON.stringify(status)
  }
  getAllProduct(): Observable<any>{
    return this.http.get(`${this.url}allproduct`,{ headers:this.headers })
    // console.log(22,status)
    // return JSON.stringify(status)
  }
  addCategories(data:any):Observable<any>{
    return this.http.post(`${this.url}addcategories`,data,{ headers:this.headers })
  }
  async removecategories(data:any){
    return await lastValueFrom(this.http.post(`${this.url}removecategories`,{id:data},{ headers:this.headers }))
  }
  async getCategoryById(data:any){
    const status=  await lastValueFrom(this.http.post(`${this.url}getcategorybyid`,{id:data},{ headers:this.headers }))
    return status
  }
  async updateCategory(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}updatecategory`,data,{ headers:this.headers }))
    return status
  }
  async addsubcategory(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}addsubcategory`,data,{ headers:this.headers }))
    return status
  }
  async getsubcategoryFromMainCategory(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}getsubcategoryFromCategory`,{category:data},{ headers:this.headers }))
    return status
  }
  async getallsub(){
    const status = await lastValueFrom(this.http.get(`${this.url}getallsub`,{ headers:this.headers }))
    return status
  }
  async removesubcategory(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}removesubcategory`,{_id:data},{ headers:this.headers }))
    return status
  }
  async updatesub(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}updatesub`,data,{ headers:this.headers }))
    return status
  }
  async getsubFromId(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}getsubcategoriesfromid`,{_id:data},{ headers:this.headers }))
    return status
  }
  async getsubcategorybyname(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}getsubcategoryfromname`,{name:data},{ headers:this.headers }))
    return status
  }
  async getproductsbyid(data:any){
    console.log(data)
    const status = await lastValueFrom(this.http.post(`${this.url}getproductsbyid`,{_id:data},{ headers:this.headers }))
    return status
  }
  async forgotpassword(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}forgotpassword`,{email:data},{headers:this.headers}))
    return status
  }
  async forgotpasswordupdate(data:any){
    const status = await lastValueFrom(this.http.post(`${this.url}forgotpasswordupdate`,data,{headers:this.headers}))
    return status
  }
} 
