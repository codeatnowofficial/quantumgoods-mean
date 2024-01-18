import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  status:any
  email!:string
  codeenter:boolean =false
  newpass:boolean = false
  message:boolean = false
  messageotp:boolean = false
  messagepass!:string
  bmessagepass:boolean = false
  loading:boolean = false
  passwordupdate:any
  data:any={}
  constructor(private http:ApiService,private router:Router){}

  async verify(data:any,e:any){
    this.loading=true
    e.preventDefault()
    this.status = await this.http.forgotpassword(data) 
    console.log(this.status)
    if(this.status.message == 'user not found'){
      this.message = true
      this.loading=false
    }else{
      this.email=data
      this.loading=false
      this.codeenter = true
      alert("Please check your mail")
    }
  }

  verifycode(code:any,e:any){
    e.preventDefault()
    if(this.status.code == code){
      console.log(true)
      this.newpass = true
    }else{
      this.messageotp = true
    }
  }

  async newpassfn(pass:any,e:any){
    e.preventDefault()
    this.data = {
      password:pass,
      email:this.email
    }
    console.log(this.data)
    this.passwordupdate = await this.http.forgotpasswordupdate(this.data)
    console.log(this.passwordupdate)
    if(this.passwordupdate.status == 1 && this.passwordupdate.message == 'password not exist'){
      alert("password Updated Succesfully");
      this.router.navigate(['/'])
    }
    if(this.passwordupdate.status == 0){
      if(this.passwordupdate.message == 'password already exist'){
        this.bmessagepass = true
        this.messagepass=this.passwordupdate.message
      }
      this.bmessagepass = true
      this.messagepass = this.passwordupdate.message
    }
  }

}
