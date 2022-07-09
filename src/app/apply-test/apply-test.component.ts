import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup , Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Test } from '../class/test';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-apply-test',
  templateUrl: './apply-test.component.html',
  styleUrls: ['./apply-test.component.css']
})
export class ApplyTestComponent implements OnInit {
 
  testLocation:any;
  isChecked : boolean = true ;
  static returnedPlan : any ;
  selectedPlan =ApplyTestComponent.returnedPlan ;
  test : Test = new Test("","",File.prototype,"","","","","","");

  applyTestForm = new UntypedFormGroup({
    patientName : new UntypedFormControl('',[Validators.required]),
    doctorName : new UntypedFormControl('',[Validators.required]),
    prescriptionFile : new UntypedFormControl('',[Validators.required]),
    contactNo : new UntypedFormControl('',[
      Validators.required,
      Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
      Validators.minLength(10)]),
    testType : new UntypedFormControl('',[Validators.required]),
    testdate : new UntypedFormControl('',[Validators.required]) ,
    testLocation  : new UntypedFormControl('',[Validators.required]) ,
    homeAddress :  new UntypedFormControl('') ,
    labAddress :  new UntypedFormControl('') 
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
  get labAddress(){
    return this.applyTestForm.get('labAddress') ;
  }
  submitTestForm(){
    console.log("Address type selected : ",this.applyTestForm.value.testLocation);
    if(this.applyTestForm.value.testLocation == 1){
      this.test.testLocation = "Home";
      this.test.address = this.applyTestForm.value.homeAddress ;
    } else if(this.applyTestForm.value.testLocation == 0){
      this.test.testLocation = "LAB";
      this.test.address = "Sr.no 43/12 , ABC Nirman , Laxman nagar , Thergaon , Pune , Maharashtra , India .";
    }
    this.test.testType = this.selectedPlan ;
    this.test.testStatus = "Accept";
    console.log("Test Object value : ",this.test);
    let resp = this.testService.addNewTest(this.test) ;
    resp.subscribe(data => {
        console.log("New test added : ." , data);
       
    })
  }
  constructor(private testService:TestService ,private router : Router) { }

  ngOnInit(): void {
  }
  
  OnSelectTestButtonClick(){
    this.router.navigate([`/TestPrice`]); 
  }

  static onPlanSelected(){
    if(localStorage.getItem("planSelected") != undefined){
      this.returnedPlan = localStorage.getItem("planSelected");
    } else {
      localStorage.removeItem("planSelected");
    }
  }

  isPlanSelected(){
    return this.selectedPlan ;
  }

  onMakePaymentClick(){
    this.router.navigate([`${'order'}`]);
    console.log("Make Payment Button Clicked ....");
  }
}

