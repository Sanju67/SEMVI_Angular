import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileData } from '../class/file-data';
import { Pathologist } from '../class/pathologist';
import { DownloadFileService } from '../service/download-file.service';
import { TestService } from '../service/test.service';
import { saveAs } from 'file-saver';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Test } from '../class/test';
import { formatDate } from '@angular/common';
import { Report } from '../class/report';
import { ReportService } from '../service/report.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard-pathologist',
  templateUrl: './dashboard-pathologist.component.html',
  styleUrls: ['./dashboard-pathologist.component.css']
})
export class DashboardPathologistComponent implements OnInit {
  fileList?: FileData[];
  numberofTest : number = 0 ;
  selectedFiles?: FileList;
	currentFile?: File;
  todayDate = formatDate(new Date(), 'dd-MM-YYYY', 'en') ;
  allRequestedTest : any ;
  test:any ;
  pathologist : Pathologist = new Pathologist("","","","","","") ;
  report : Report = new Report(0,"","","","") ;
  pathologistOwnerName = localStorage.getItem('pathologistOwnerName') ;
  returnObject: any;
  allReportsReceived: any;
  numberofReports: number =0 ;

  constructor(private testservice : TestService ,private downloadFileService : DownloadFileService,private reportService : ReportService, private router : Router) { 
  }

  ngOnInit(): void {
    this.testservice.getAllRequestTest().subscribe(data=>{
      this.test = JSON.parse(JSON.stringify(data)) ;
      this.numberofTest = Object.keys(data).length ;
     // console.log("Value at 0 position , patient name is : ",this.test[0].patientName);
      //console.log("Any pending test is there :",this.isAnyTestPending()) ;
    }); 

    this.reportService.getAllReport().subscribe(reports =>{
      this.allReportsReceived = JSON.parse(JSON.stringify(reports)) ;
      this.numberofReports = Object.keys(reports).length ;
      console.log("Report at 0 position : " , this.allReportsReceived[0])
    }) ;
  } 

  downloadFile(test: Test): void {
    console.log("Inside download file method")
    this.downloadFileService
      .download(test.prescriptionFile)
      .subscribe(blob => saveAs(blob, test.prescriptionFile));
  }

  downloadReport(report: Report): void {
    console.log("Inside report file method" , report)
    this.downloadFileService
      .download(report.reportFile)
      .subscribe(blob => saveAs(blob,report.reportFile));
  }
 
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    }

  acceptStatus(test : Test){
    this.testservice.updateStatus(test).subscribe(data=>{
      //console.log("Value of test data : ",data);
    }); 
  }

  selectReport(event : any){
    this.selectedFiles = event.target.files;
    console.log(event.target.files[0].name) ;
  }

  upload(filename : any) {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
    
      if (file) {
      this.currentFile = file;
    
      this.downloadFileService.upload(this.currentFile,filename).subscribe(
        (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("Prescription file uploaded")
        } 
        });
      }
    }
  }

  uploadReport(test : Test){
    var filename =  this.todayDate+"-"+ test.patientName+ "--"; 
    this.report.patientName = test.patientName ;
    this.report.reportDate = formatDate(new Date(), 'dd/MM/YYYY', 'en') ;
    this.report.reportFile = filename ;
    this.report.testType = test.testType ;
    this.report.user_id = test.user_id ;
    this.report.test_id = test.test_id ;
    this.reportService.addReport(this.report).subscribe(result => {
      console.log("result : " ,result)
      this.returnObject = result ;
      this.upload(filename + this.returnObject['filename']);
      this.acceptStatus(test);
    });
  }
  
  isAnyTestPending() : boolean{
   for(let i=0 ;i<this.numberofTest;i++){
      if(this.test[i].testStatus == "Pending"){
        return true ;
        break ;
      }
   }
    return false ;
  }

  downloadReports(test_id : number) {
    console.log("Test id : " , test_id)
    console.log("Number of report " , this.numberofReports);
    for(let i =0;i< this.numberofReports;i++){
      console.log("inside for for loop for reprt - test id " , this.allReportsReceived[i].report_id)
      if(this.allReportsReceived[i].test_id == test_id){
        console.log("Report name : ",this.allReportsReceived[i].reportFile)
        this.downloadReport(this.allReportsReceived[i]) ;
        
      }
    }
  }
}
