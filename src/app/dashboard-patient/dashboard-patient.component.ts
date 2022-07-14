import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { Patient } from '../class/patient';
import { Report } from '../class/report';
import { DownloadFileService } from '../service/download-file.service';
import { PatientService } from '../service/patient.service';
import { ReportService } from '../service/report.service';
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
  patient: Patient = new Patient("", "", "", "", "");
  report?:any;
  allReports:any ;
  numberofReports: number = 0 ;
  numberofTests : number = 0 ;
  constructor(private patientService : PatientService ,private testService : TestService, 
    private reportService : ReportService ,private downloadFileService : DownloadFileService ,private router : Router) { }

  ngOnInit(): void {
     this.currentPatient = localStorage.getItem("CurrentPatient") ;
      this.patient = JSON.parse(this.currentPatient) ;
      this.userName = localStorage.getItem("patientUserName");

      this.testService.getAllRequestTest().subscribe(data=>{
        this.allRequestedTest = JSON.parse(JSON.stringify(data)) ;
        this.numberofTests = Object.keys(data).length ;
      });

      this.reportService.getAllReport().subscribe(data=>{
          this.allReports = JSON.parse(JSON.stringify(data));
          this.numberofReports = Object.keys(data).length ;
      });
      

  }

  onApplyTestButtonClick(pageName : string) : void {
    this.router.navigate([`${pageName}`]);
  }

  downloadReport(report : Report): void{
    console.log("request received for : " ,report);
    this.downloadFileService.download(report.reportFile).subscribe(
      blob => {
        return saveAs(blob, report.reportFile);
      });
  }

  isReportPresent() : boolean {
    for(let i=0 ;i<this.numberofReports;i++){
      if(this.allReports[i].user_id == this.patient.id){
        return true ; break;
      }
    }
    return false;
  }

  isAppliedforTest() : boolean{
    for(let i=0 ;i<this.numberofTests;i++){
      if(this.allRequestedTest[i].user_id == this.patient.id && this.allRequestedTest[i].testStatus !='Completed'){
        return true ; break;
      }
    }
    return false;
  }

}