import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../service/patient.service';
import { PathologistService } from '../service/pathologist.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  userOption : any ;
  testOption : any ;
  paymentOption :  any ;
  allPatient : any ;
  allPatientIsNotNull : boolean = false ;
  chooseValidUserOptionMessage : boolean = false ;
  noUserFound : boolean = false ;
 
  constructor(private router : Router , private patientService : PatientService,private pathologistService : PathologistService) { }

  ngOnInit(): void {
  }

  userSelection(event : any){
    this.userOption = event.target.value;
  }

  showAllUser(){
    console.log("Option selected : ",this.userOption);
    if(this.userOption == 1){
      this.chooseValidUserOptionMessage = false;
      this.noUserFound = false ;
      console.log("make service call to get all user data") ;
      let resp = this.patientService.getPatients() ;
      resp.subscribe(data => {
        this.allPatient = data;
        console.log("All Patient  : ", data) ;
        this.allPatientIsNotNull =true ;
    });
  } else if(this.userOption != 1){
    this.chooseValidUserOptionMessage = true ;
    this.allPatientIsNotNull = false ;
  } else if(this.allPatient == null){
    this.noUserFound = true ;
  }
}

}
