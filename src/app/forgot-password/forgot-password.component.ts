import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
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
    this.loginCred.email = mailID.value;
  localStorage.setItem("MailToUpdate",this.loginCred.email) ;
    this.loginCred.password = "BTMS@123" ;
     this.managePasswordService.sendMail(this.loginCred).subscribe();
     this.Toast.fire({
      icon: 'success',
      title: 'Email is sent Successfully !!! '
    })
  }
  
}
