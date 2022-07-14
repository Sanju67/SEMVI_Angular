import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../class/login';
import { ManagePasswordService } from '../service/manage-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  x: any ;
  login : any ;
  constructor(private router : Router,private managePasswordService : ManagePasswordService) { }

  ngOnInit(): void {
  }

  ForgotPasswordForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
  })

  get email(){
    return this.ForgotPasswordForm.get('email') ;
  }

  loginCred : Login =  new Login("","")
  

  onLoginClick(pageName: string) : void{
    this.router.navigate([`${pageName}`]);
  }

  onGetNewPasswordClick(mailID : any){
     console.log("Get new password button clicked" , mailID.value) ;
    //  this.managePasswordService.sendMail("sanjugour67@gmail.com").subscribe({
    //       console.log("Send mail service call sent") ,
    //  })
    this.loginCred.email = mailID.value;
    localStorage.setItem("MailToUpdate",this.loginCred.email) ;
    this.loginCred.password = "BTMS@123" ;
    console.log("Value of login Cred : " , this.loginCred.email) ;
     this.managePasswordService.sendMail(this.loginCred).subscribe();
  }
  
}
