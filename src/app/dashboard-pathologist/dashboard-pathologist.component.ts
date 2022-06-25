import { Component, OnInit } from '@angular/core';
import { Pathologist } from '../class/pathologist';

@Component({
  selector: 'app-dashboard-pathologist',
  templateUrl: './dashboard-pathologist.component.html',
  styleUrls: ['./dashboard-pathologist.component.css']
})
export class DashboardPathologistComponent implements OnInit {

  pathologyName="Shraddha Laboratory"
  pathologist : Pathologist = new Pathologist("","","","","","") ;
  pathologistOwnerName = localStorage.getItem('pathologistOwnerName') ;
  constructor() { }

  ngOnInit(): void {
  }

}
