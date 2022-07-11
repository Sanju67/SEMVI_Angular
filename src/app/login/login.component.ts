import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormControl, UntypedFormGroup , Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../class/login';
import { Patient } from '../class/patient';
import { DashboardPatientComponent } from '../dashboard-patient/dashboard-patient.component';
import { PatientService } from '../service/patient.service';
import { PathologistService } from '../service/pathologist.service';
import { Pathologist } from '../class/pathologist';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName : any ;
  userType:any ;
  login : Login = new Login("","") ;
  
  patient: Patient = new Patient("", "", "", "", "");
  pathologist : Pathologist = new Pathologist("","","","","","") ;
  loginForm = new UntypedFormGroup({
    email : new UntypedFormControl('',[Validators.required,Validators.email]),
    password : new UntypedFormControl('',[Validators.required,Validators.minLength(4)]) ,
  })
  selectChangeHandler (event: any) {
    //update the ui
    this.userType = event.target.value;
    console.log('User selected',this.userType);
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
              alert("Invalid login credentials ... Please try again") ;
          } else { 
              this.patient = JSON.parse(data);
              this.setcurrentPatient(this.patient) ;
              this.patient.firstName = this.patient.firstName.charAt(0).toUpperCase() + this.patient.firstName.slice(1);
              this.patient.lastName =  this.patient.lastName.charAt(0).toUpperCase() + this.patient.lastName.slice(1);
              this.userName =  this.patient.firstName + " " + this.patient.lastName ;
              localStorage.setItem("CurrentPatient", JSON.stringify(this.patient)) ;
              localStorage.setItem("patientUserName",this.userName);
              this.router.navigate([`/DashboardPatient`]);
          }
      });
   }
   else if(this.userType=="pathologist"){
    let resp = this.pathologistService.loginUser(this.login) ;
    resp.subscribe(data => {
        if(data==""){
          alert("Invalid login credentials ... Please try again") ;
        } else {
           this.pathologist = JSON.parse(data);
           this.setcurrentPathologist(this.pathologist)
            this.pathologist.owner_name = this.pathologist.owner_name.charAt(0).toUpperCase() + this.pathologist.owner_name.slice(1);
            localStorage.setItem("CurrentPathologist",data) ;
            localStorage.setItem("pathologistOwnerName",this.pathologist.owner_name );
            this.router.navigate([`/DashboardPathologist`]);
        }  
    });

   }
  }

  OnRegisterButtonClick(pageName : string) : void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
    
  }

  setcurrentPatient (patient : Patient) : void {
    this.patient = patient ;
  }
  setcurrentPathologist (pathologist : Pathologist) : void {
    this.pathologist = pathologist ;
  }

}
