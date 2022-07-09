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
  
  patient: Patient = new Patient("","","","","");
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
    console.log(this.loginForm.value) ;
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
          console.log("Login successfully inside login component." , data);
          
          let array = data.split(" ",3) ;
        
          console.log("Value of array[0]",array[0]);
          if(array[0]=="Login"){
            console.log("Login returned") ;
            alert("Invalid login credentials ... Please try again") ;
          } else { 
            this.patient.firstName = array[1].charAt(0).toUpperCase() + array[1].substr(1).toLowerCase() ;
            this.patient.lastName = array[2].charAt(0).toUpperCase() + array[2].substr(1).toLowerCase() ;
            this.userName =  this.patient.firstName + " " + this.patient.lastName ;
            localStorage.setItem("patientUserName",this.userName) ;
            this.router.navigate([`${array[0]}`]);
          }
          
      });
   }
   else if(this.userType=="pathologist"){
    let resp = this.pathologistService.loginUser(this.login) ;
    resp.subscribe(data => {
        console.log("Login successfully inside login component." , data);
        console.log(data) ;
        let array = data.split(" ",3) ;
       
        console.log("Value of array[0]",array[0]);
        if(array[0]=="Login"){
          console.log("Login returned") ;
          alert("Invalid login credentials ... Please try again") ;
        } else {
          this.pathologist.owner_name = array[1].charAt(0).toUpperCase() + array[1].substr(1).toLowerCase() ;
          localStorage.setItem("pathologistOwnerName",this.pathologist.owner_name) ;
          this.router.navigate([`/DashboardPathologist`]);
        }
        // this.router.navigate([`${array[0]}`]);
        
    });

   }
  }

  OnRegisterButtonClick(pageName : string) : void{
    this.router.navigate([`${pageName}`]);
  }
  ngOnInit(): void {
    
  }

}
