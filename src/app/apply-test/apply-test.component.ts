import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-apply-test',
  templateUrl: './apply-test.component.html',
  styleUrls: ['./apply-test.component.css']
})
export class ApplyTestComponent implements OnInit {

  testLocation:any;
  isChecked : boolean = true ;

  applyTestForm = new FormGroup({
 patientName : new FormControl('',[Validators.required]),
   doctorName : new FormControl('',[Validators.required]),
    prescriptionFile : new FormControl('',[Validators.required]),
    contactNo : new FormControl('',[
      Validators.required,
      Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
      Validators.minLength(10)]),
    testType : new FormControl('',[Validators.required]),
    testdate : new FormControl('',[Validators.required]) ,
    homeAddress  : new FormControl('',[Validators.required]) ,
  })


  
  get patientName(){
    return this.applyTestForm.get('patientName') ;
  }

  get doctorName(){
    return this.applyTestForm.get('doctorName') ;
  }

  get prescriptionFile(){
    return this.applyTestForm.get('prescriptionFile') ;
  }

  get contactNo(){
    return this.applyTestForm.get('contactNo') ;
  }

  get testType(){
    return this.applyTestForm.get('testType') ;
  }

  get testdate(){
    return this.applyTestForm.get('testdate') ;
  }

  get homeAddress(){
    return this.applyTestForm.get('homeAddress') ;
  }

  submitTestForm(){
    console.log("Apply test button was clicked") ;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
