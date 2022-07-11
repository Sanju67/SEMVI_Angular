import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../class/patient';
import { PatientService } from '../service/patient.service';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.component.html',
  styleUrls: ['./dashboard-patient.component.css']
})
export class DashboardPatientComponent implements OnInit {

  userName :any ;
  currentPatient: any;
  allRequestedTest : any ;
  patients : any ;
  patient?: Patient;
  constructor(private patientService : PatientService ,private testService : TestService, private router : Router) { }

  ngOnInit(): void {
     this.currentPatient = localStorage.getItem("CurrentPatient") ;
      this.patient = JSON.parse(this.currentPatient) ;
      console.log("Value of this.patient : " ,this.patient)
      this.userName = localStorage.getItem("patientUserName");

      this.testService.getAllRequestTest().subscribe(data=>{
      this.allRequestedTest = data ;

        console.log(this.allRequestedTest) ;
      });

  }

  onApplyTestButtonClick(pageName : string) : void {
    this.router.navigate([`${pageName}`]);
  }

}