import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup , Validators ,FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Pathologist } from '../class/pathologist';
import { Patient } from '../class/patient';
import { PathologistService } from '../service/pathologist.service';
import { PatientService } from '../service/patient.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  patientFullName : any ;
  patient : Patient = new Patient("","","","","") ;
  pathologist : Pathologist = new Pathologist ("","","","","","") ;

  public isPatient : boolean = false;
  public isPathologist : boolean = true ;

  constructor(private router : Router, private patientservice : PatientService , 
              private pathologistservice : PathologistService) { }

  showPatient(){
    
    this.isPatient = false;
    this.isPathologist=true ;
  }

  showPathologist(){
    this.isPatient = true;
    this.isPathologist=false ;

  }


  patientForm = new UntypedFormGroup({
    firstName : new UntypedFormControl('',[Validators.required]),
    lastName : new UntypedFormControl('',[Validators.required]),
    password : new UntypedFormControl('',[Validators.required]),
    confirmPassword : new UntypedFormControl('',[Validators.required]),
    patientEmail : new UntypedFormControl('',[Validators.required,Validators.email]),
    patientContactno : new UntypedFormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
  })

  get firstName(){
    return this.patientForm.get('firstName') ;
  }


  get lastName(){
    return this.patientForm.get('lastName') ;
  }

  get password(){
    return this.patientForm.get('password') ;
  }

  get confirmPassword(){
    return this.patientForm.get('confirmPassword') ;
  }

  get patientEmail(){
    return this.patientForm.get('patientEmail') ;
  }

  get patientContactno(){
    return this.patientForm.get('patientContactno') ;
  }

  patientformSubmit(){
    console.log("Patient form submitted") ;
  }

  pathologistForm = new UntypedFormGroup({
    owner_name : new UntypedFormControl('',[Validators.required]),
    shop_name : new UntypedFormControl('',[Validators.required]),
    email : new UntypedFormControl('',[Validators.required,Validators.email]),
    contact_no : new UntypedFormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
      Validators.maxLength(10)]),
      address : new UntypedFormControl('',[Validators.required]),
      password : new UntypedFormControl('',[Validators.required]),
      pathologistConfirmPassword : new UntypedFormControl('',[Validators.required]),
    
  })

  get pathologistOwnerName(){
    return this.pathologistForm.get('pathologistOwnerName') ;
  }

  get pathologistShopName(){
    return this.pathologistForm.get('pathologistShopName') ;
  }

  get pathologistEmail(){
    return this.pathologistForm.get('pathologistEmail') ;
  }

  get pathologistPhoneNo(){
    return this.pathologistForm.get('pathologistPhoneNo') ;
  }

  get pathologistAddress(){
    return this.pathologistForm.get('pathologistAddress') ;
  }

  get pathologistPassword(){
    return this.pathologistForm.get('pathologistPassword') ;
  }

  get pathologistConfirmPassword(){
    return this.pathologistForm.get('pathologistConfirmPassword') ;
  }

  pathologistFormSubmit(){
    console.log("pathologist Form Submitted") ;
  }
  

  onLoginButtonClick(pageName: string) : void{
    this.router.navigate([`${pageName}`]);
  }

  OnPatientRegisterButtonClick(pageName : string) : void{
    
    let resp = this.patientservice.addPatient(this.patient) ;
    resp.subscribe(data => {
        console.log("patient added successfully ." , data);
    })
    this.patient.firstName = this.patient.firstName.charAt(0).toUpperCase() + this.patient.firstName.substr(1).toLowerCase() ;
    this.patient.lastName =  this.patient.lastName.charAt(0).toUpperCase() +  this.patient.lastName.substr(1).toLowerCase() ;
    this.patientFullName =  this.patient.firstName + " " + this.patient.lastName ;
    localStorage.setItem("patientUserName",this.patientFullName) ;
    this.router.navigate([`${pageName}`]);
  }

  OnPathologistRegisterButtonClick(pageName : string) : void{
    let resp = this.pathologistservice.addPathologist(this.pathologist) ;
    resp.subscribe(data => {
        console.log("pathologist added successfully ." , data);
       
    })
    this.pathologist.owner_name = this.pathologist.owner_name.charAt(0).toUpperCase() + this.pathologist.owner_name.substr(1).toLowerCase() ;
    localStorage.setItem("pathologistOwnerName",this.pathologist.owner_name) ;
    this.router.navigate([`/DashboardPathologist`]);
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
  }

}
function data(data: any) {
  throw new Error('Function not implemented.');
}

