import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup , Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Patient } from '../class/patient';
import { Test } from '../class/test';
import { DownloadFileService } from '../service/download-file.service';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-apply-test',
  templateUrl: './apply-test.component.html',
  styleUrls: ['./apply-test.component.css']
})
export class ApplyTestComponent implements OnInit {
  
  currentUser : any ;
  patient: Patient = new Patient("", "", "", "", "");
  returnedObject : any ;
  testLocation:any;
  isChecked : boolean = true ;
  selectedFiles?: FileList;
	currentFile?: File;
  static returnedPlan : any ;
  selectedPlan =ApplyTestComponent.returnedPlan ;
  test : Test = new Test("","","","","","","","","");

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

  applyTestForm = new UntypedFormGroup({
    patientName : new UntypedFormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    doctorName : new UntypedFormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
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
    if(this.applyTestForm.value.testLocation == 1){
      this.test.testLocation = "Home";
      this.test.address = this.applyTestForm.value.homeAddress ;
    } else if(this.applyTestForm.value.testLocation == 0){
      this.test.testLocation = "LAB";
      this.test.address = "Sr.no 43/12 , ABC Nirman , Laxman nagar , Thergaon , Pune , Maharashtra , India .";
    }
    this.test.testType = this.selectedPlan ;
    this.test.testStatus = "Pending";
    this.test.user_id = this.patient.id ;
    
    let resp = this.testService.addNewTest(this.test) ;
    resp.subscribe(data => {
      this.returnedObject= data;
      console.log("this.returnedObject['filename']" , this.returnedObject['filename'])
        this.upload(this.returnedObject['filename']);
        Swal.fire(
          'Form Submitted!',
          'You have applied for test successfully',
          'success'
        )
        sessionStorage.clear() ;
        this.router.navigate([`/DashboardPatient`]);
       
    })
  }
  constructor(private testService:TestService, private downloadFileService : DownloadFileService ,private router : Router) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem("CurrentPatient") ;
    this.patient = JSON.parse(this.currentUser) ;

    if(this.isPaidAmount()){
      this.test.patientName = sessionStorage.getItem("tempPatientName") || "";
      this.test.doctorName = sessionStorage.getItem("tempDoctorName") || "";
      this.test.prescriptionFile = sessionStorage.getItem("tempPrescriptionFile") || "";
      this.test.contactno = sessionStorage.getItem("tempContactNo") || "";
      this.test.testDate = sessionStorage.getItem("tempTestDate") || "";
      this.test.address = sessionStorage.getItem("tempTestAddress") || "";
      this.test.testLocation = sessionStorage.getItem("tempTestLocation") || "" ;
    }
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
    
    sessionStorage.setItem("tempPatientName",this.applyTestForm.value.patientName)
    sessionStorage.setItem("tempDoctorName",this.applyTestForm.value.doctorName)
    sessionStorage.setItem("tempPrescriptionFile",this.applyTestForm.value.prescriptionFile);
    sessionStorage.setItem("tempContactNo",this.applyTestForm.value.contactNo) ;
    sessionStorage.setItem("tempTestDate",this.applyTestForm.value.testdate) ;
    sessionStorage.setItem("tempTestAddress",this.test.address) ;
    sessionStorage.setItem("tempTestLocation",this.applyTestForm.value.testLocation)
    
    this.router.navigate([`${'order'}`]);
  }

  uploadPrescription(event : any){
    this.selectedFiles = event.target.files;
  }

  upload(filename : any) {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
    
      if (file) {
      this.currentFile = file;
    
      this.downloadFileService.upload(this.currentFile,filename).subscribe(
        (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.Toast.fire({
            icon: 'success',
            title: 'Precription file uploaded !!'
          })
        } 
        });
      }
    }
  }

  isPaidAmount() : boolean{
    if(localStorage.getItem('paid')){
      return true;
    }
    return false ;
  }

}