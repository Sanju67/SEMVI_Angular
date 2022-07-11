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

@Component({
  selector: 'app-dashboard-pathologist',
  templateUrl: './dashboard-pathologist.component.html',
  styleUrls: ['./dashboard-pathologist.component.css']
})
export class DashboardPathologistComponent implements OnInit {
  fileList?: FileData[];
  selectedFiles?: FileList;
	currentFile?: File;
  todayDate = formatDate(new Date(), 'dd-MM-YYYY', 'en') ;
  allRequestedTest : any ;
  pathologist : Pathologist = new Pathologist("","","","","","") ;
  report : Report = new Report(0,"","","","") ;
  pathologistOwnerName = localStorage.getItem('pathologistOwnerName') ;
  returnObject: any;

  constructor(private testservice : TestService ,private downloadFileService : DownloadFileService,private reportService : ReportService, private router : Router) { 
  }

  ngOnInit(): void {
    console.log("todays date and time : ",formatDate(new Date(), 'dd/MM/YYYY' , 'en'))
    this.getFileList();
    this.testservice.getAllRequestTest().subscribe(data=>{
      this.allRequestedTest = data ;
      console.log("Value of test data : ",this.allRequestedTest);
    }); 
  } 

  getFileList(): void {
    this.downloadFileService.list().subscribe(result => {
      console.log("result : " ,result)
      this.fileList = result;
    });
  }
  downloadFile(test: Test): void {
    console.log("Inside download file method")
    this.downloadFileService
      .download(test.prescriptionFile)
      .subscribe(blob => saveAs(blob, test.prescriptionFile));
  }
 
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    }

  acceptStatus(test : Test){
    this.testservice.updateStatus(test).subscribe(data=>{
      console.log("Value of test data : ",data);
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
    this.reportService.addReport(this.report).subscribe(result => {
      console.log("result : " ,result)
      this.returnObject = result ;
      this.upload(filename + this.returnObject['filename']);
    });
  }
  
}
