import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/class/login';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {
  success: string= "";
  login : Login = new Login("","") ;
  currentPatient: any;
  patient: any;
  mailID: any ;
  constructor(private router : Router , private patientService : PatientService) { }

  ngOnInit(): void {
  }

  updatePasswordForm = new FormGroup(
    {
      password: new FormControl('', [Validators.required,Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
  );

  get password(){
    return this.updatePasswordForm.get('password') ;
  }
  get confirmPassword(){
    return this.updatePasswordForm.get('confirmPassword') ;
  }
 

  onUpdatePasswordButtonClick(password : any , confirmPassword : any) : void{
    if(password.value != confirmPassword.value){
      alert("Password does not please.Please try again !!!")
    }else{
      this.mailID = localStorage.getItem('MailToUpdate') ;
      this.login.email = this.mailID ;
      this.login.password = password.value ;
    }

let resp = this.patientService.resetPassword(this.login) ;
    resp.subscribe(data => {
          alert("Password updated successfully ...")
          this.router.navigate([`${`Login`}`]);
      });

  }


}
