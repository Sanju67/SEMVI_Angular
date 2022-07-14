import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormControl, UntypedFormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../class/login';
import { Patient } from '../class/patient';
import { PatientService } from '../service/patient.service';
import { PathologistService } from '../service/pathologist.service';
import { Pathologist } from '../class/pathologist';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName : any ;
  userType:any ;
  login : Login = new Login("","") ;
  
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
  
  patient: Patient = new Patient("", "", "", "", "");
  pathologist : Pathologist = new Pathologist("","","","","","") ;
  loginForm = new UntypedFormGroup({
    email : new UntypedFormControl('',[Validators.required,Validators.email]),
    password : new UntypedFormControl('',[Validators.required,Validators.minLength(4)]) ,
  })
  selectChangeHandler (event: any) {
    this.userType = event.target.value;
  }
 
  loginUser(){
  }

  get email(){
    return this.loginForm.get('email') ;
  }

  get password(){
    return this.loginForm.get('password');
  }

  getUserType(){
    return this.loginForm.get('userType') ;
  }
  constructor(private router : Router , private patientService : PatientService,private pathologistService : PathologistService) { }

  OnLoginButtonClick(pageName : string) : void{
    if(this.userType=="patient") {

      let resp = this.patientService.loginUser(this.login) ;
      resp.subscribe(data => {
          if(data==""){
            Swal.fire({icon: 'error', title: 'Invalid login credentials...',text: ' Please try again!!!'})
          } else { 
              this.patient = JSON.parse(data);
              this.patient.firstName = this.patient.firstName.charAt(0).toUpperCase() + this.patient.firstName.slice(1);
              this.patient.lastName =  this.patient.lastName.charAt(0).toUpperCase() + this.patient.lastName.slice(1);
              this.userName =  this.patient.firstName + " " + this.patient.lastName ;
              localStorage.setItem("CurrentPatient", JSON.stringify(this.patient)) ;
              localStorage.setItem("patientUserName",this.userName);
              this.Toast.fire({icon: 'success',title: 'Signed in successfully'});
              this.router.navigate([`/DashboardPatient`]);
          }
      });
   }
   else if(this.userType=="pathologist"){
    let resp = this.pathologistService.loginUser(this.login) ;
    resp.subscribe(data => {
        if(data==""){
          Swal.fire({icon: 'error', title: 'Invalid login credentials...',text: ' Please try again!!!'})
        } else {
           this.pathologist = JSON.parse(data);
           this.setcurrentPathologist(this.pathologist)
            this.pathologist.owner_name = this.pathologist.owner_name.charAt(0).toUpperCase() + this.pathologist.owner_name.slice(1);
            localStorage.setItem("CurrentPathologist",data) ;
            localStorage.setItem("pathologistOwnerName",this.pathologist.owner_name );
            this.Toast.fire({icon: 'success',title: 'Signed in successfully'});
            this.router.navigate([`/DashboardPathologist`]);
        }  
    });

   }
  }

  OnRegisterButtonClick(pageName : string) : void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {}

  setcurrentPatient (patient : Patient) : void {
    this.patient = patient ;
  }
  setcurrentPathologist (pathologist : Pathologist) : void {
    this.pathologist = pathologist ;
  }

  

}
