import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})

export class LoginComponent {
  loginform: FormGroup
  close = true
  bpassshow:boolean = false
  msg = ""
  status: any
  loginTextALert = false
  
  constructor(private form: FormBuilder, private service: ApiService, private router: Router) {
    this.loginform = form.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required,Validators.minLength(5)]]
    })
  }

  toastClose() {
    this.close = !this.close
  }
  show(pass:any){
    this.bpassshow = !this.bpassshow
    if(this.bpassshow){
      pass.type='text'
    }else{
      pass.type='password'
    }
  }

  async login() {
    console.log(this.loginform.value)
    this.status = await this.service.userslogin(this.loginform.value)
    let data = JSON.parse(this.status)
    console.log(data.status)
    if(data.status == "password not match"){
      console.log("password not match")
      this.loginTextALert = false
      this.close = true
      this.msg = ""
      this.msg = "Incorrect Password"
    }
    if (data.status == 0) {
      this.loginTextALert = true
      localStorage.setItem("login", "false")
      this.close = true
      this.msg = ""
      this.msg = "Wrong Credentials Please"
      console.log(this.msg)
    }

    if(data.status == 1) {
      this.loginTextALert=false
      localStorage.setItem("login", "true")
      this.router.navigate(['/dashboard'])
      if(data.token){
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",data.userid)
      }
    } 
  }
}