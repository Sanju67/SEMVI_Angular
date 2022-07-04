import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pathologist } from '../class/pathologist';
import { TestService } from '../service/test.service';

@Component({
  selector: 'app-dashboard-pathologist',
  templateUrl: './dashboard-pathologist.component.html',
  styleUrls: ['./dashboard-pathologist.component.css']
})
export class DashboardPathologistComponent implements OnInit {

  allRequestedTest : any ;
  pathologist : Pathologist = new Pathologist("","","","","","") ;
  pathologistOwnerName = localStorage.getItem('pathologistOwnerName') ;
  constructor(private service : TestService , private router : Router) { }

  ngOnInit(): void {
    this.service.getAllRequestTest().subscribe(data=>{
      this.allRequestedTest = data ;
      console.log("Value of test data : ",this.allRequestedTest);
    });
    
  }
  
}
