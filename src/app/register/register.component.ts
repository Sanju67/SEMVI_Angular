import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators ,FormsModule , ReactiveFormsModule} from '@angular/forms';
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


  patientForm = new FormGroup({
    firstName : new FormControl('',[Validators.required]),
    lastName : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
    confirmPassword : new FormControl('',[Validators.required]),
    patientEmail : new FormControl('',[Validators.required,Validators.email]),
    patientContactno : new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
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

  pathologistForm = new FormGroup({
    owner_name : new FormControl('',[Validators.required]),
    shop_name : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.email]),
    contact_no : new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
      Validators.maxLength(10)]),
      address : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
    ConfirmPassword : new FormControl('',[Validators.required]),
    
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
    this.router.navigate([`${pageName}`]);
  }

  OnPathologistRegisterButtonClick(pageName : string) : void{
    let resp = this.pathologistservice.addPathologist(this.pathologist) ;
    resp.subscribe(data => {
        console.log("pathologist added successfully ." , data);
    })
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
  }

}
function data(data: any) {
  throw new Error('Function not implemented.');
}

