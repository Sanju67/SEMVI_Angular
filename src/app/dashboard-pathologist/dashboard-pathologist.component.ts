import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileData } from '../class/file-data';
import { Pathologist } from '../class/pathologist';
import { DownloadFileService } from '../service/download-file.service';
import { TestService } from '../service/test.service';
import { saveAs } from 'file-saver';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-pathologist',
  templateUrl: './dashboard-pathologist.component.html',
  styleUrls: ['./dashboard-pathologist.component.css']
})
export class DashboardPathologistComponent implements OnInit {
  fileList?: FileData[];
  selectedFiles?: FileList;
	currentFile?: File;
  allRequestedTest : any ;
  pathologist : Pathologist = new Pathologist("","","","","","") ;
  pathologistOwnerName = localStorage.getItem('pathologistOwnerName') ;


  constructor(private service : TestService ,private downloadFileService : DownloadFileService, private router : Router) { }

  ngOnInit(): void {
    this.getFileList();
    this.service.getAllRequestTest().subscribe(data=>{
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
  downloadFile(fileData: FileData): void {
    console.log("Inside download file method")
    this.downloadFileService
      .download(fileData.filename)
      .subscribe(blob => saveAs(blob, fileData.filename));
  }

  upload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
    
      if (file) {
      this.currentFile = file;
    
      this.downloadFileService.upload(this.currentFile).subscribe(
        (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log("File uploaded")
        } 
        });
      }
    }
  }
 
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    }
}
