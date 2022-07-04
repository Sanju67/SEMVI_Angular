import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../class/patient';
import { PatientService } from '../service/patient.service';

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.component.html',
  styleUrls: ['./dashboard-patient.component.css']
})
export class DashboardPatientComponent implements OnInit {

  userName :any ;
  patients : any ;
  patient: Patient = new Patient("","","","","");
  constructor(private patientService : PatientService , private router : Router) { }

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(data=>{
      this.patients = data ;
      this.userName = localStorage.getItem("patientUserName");
    });
  }

  onApplyTestButtonClick(pageName : string) : void {
    this.router.navigate([`${pageName}`]);
  }

}