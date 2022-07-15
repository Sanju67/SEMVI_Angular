import { Component, Inject, OnInit } from '@angular/core';
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
import Swal from 'sweetalert2';

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
  currentPathologist: any;

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

  constructor(private testservice : TestService ,private downloadFileService : DownloadFileService,private reportService : ReportService, private router : Router) { 

  }

  ngOnInit(): void {
    this.currentPathologist = localStorage.getItem("CurrentPathologist") ;
    console.log("Current pathologist : " , this.currentPathologist)
    
    this.testservice.getAllRequestTest().subscribe(data=>{
      this.test = JSON.parse(JSON.stringify(data)) ;
      this.numberofTest = Object.keys(data).length ;
    }); 

    this.reportService.getAllReport().subscribe(reports =>{
      this.allReportsReceived = JSON.parse(JSON.stringify(reports)) ;
      this.numberofReports = Object.keys(reports).length ;
    }) ;
  } 

  downloadFile(test: Test): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Prescription is getting downloaded',
      showConfirmButton: false,
      timer: 1500
    })
    this.downloadFileService
      .download(test.prescriptionFile)
      .subscribe(blob => saveAs(blob, test.prescriptionFile));
  }

  downloadReport(report: Report): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Report is getting downloaded',
      showConfirmButton: false,
      timer: 1500
    })
    this.downloadFileService
      .download(report.reportFile)
      .subscribe(blob => saveAs(blob,report.reportFile));
  }
 
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    }

  acceptStatus(test : Test){
    this.testservice.updateStatus(test).subscribe(data=>{
      this.reload() ;
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
          Swal.fire(
            'Thank You...',
            'Report has been upload successfully!',
            'success'
          )
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

  isAnyTestAccepted() : boolean{
    for(let i=0 ;i<this.numberofTest;i++){
      if(this.test[i].testStatus == "Accepted"){
        return true ;
        break ;
      }
   }
    return false ;
  }

  isAnyTestCompleted() : boolean{
    for(let i=0 ;i<this.numberofTest;i++){
      if(this.test[i].testStatus == "Completed"){
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

  reload(){
    this.ngOnInit()
  }

  
}
