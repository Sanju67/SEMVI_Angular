import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  currentPathologist : any ;
  currentPatient : any ;

  constructor(config: NgbCarouselConfig , private router  : Router) {
     config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true; 
  }

  ngOnInit(): void {
    this.currentPathologist = localStorage.getItem("CurrentPathologist") ;
    if(this.currentPathologist != null){
      this.router.navigate([`DashboardPathologist`]);
     }
  
     this.currentPatient = localStorage.getItem("CurrentPatient") ;
      if(this.currentPatient != null){
      this.router.navigate([`DashboardPatient`]);
     }
  }
  

}
