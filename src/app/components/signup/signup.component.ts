import { Component } from '@angular/core';
import { FormBuilder, FormGroup,NgForm, RequiredValidator, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[ApiService]
})
export class SignupComponent {
  signupform:FormGroup
  status=""
  msg=""
  close=true
  loading:boolean = false
  bpassshow:boolean=false
  constructor(private form:FormBuilder, private service:ApiService, private router:Router){
    this.signupform = form.group({
      username: ['',[Validators.minLength(2),Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]]
    })
  }

  show(pass:any){
    this.bpassshow = !this.bpassshow
    if(this.bpassshow){
      pass.type='text'
    }else{
      pass.type='password'
    }
  }
  
  async signup(){
    this.loading=true
    this.status = await this.service.signup(this.signupform.value)
    let data = JSON.parse(this.status)
    console.log(data.status)
    if(data.status == "email exist"){
      this.loading = false
      this.close = true
      this.msg = ""
      this.msg = "Email Already Exist please check..."
    }
    if(data.status == 0){
      this.loading=false
      this.close = true
      this.msg = ""
      this.msg = "Something went wrong please try again..."
    }
    if(data.status == 1){
      this.loading=false
      this.router.navigate(['/'])
    }
    
  }

  toastClose(){
    this.close = !this.close
    console.log(this.close)
    console.log(this.msg,this.close)
  }
}
