import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router) { 
    
  }

  ngOnInit(): void {
  
  }
  isLoggedInPatient(): any{
    return localStorage.getItem('patientUserName') ;
  }

  isLoggedInPathologist() :any {
    return localStorage.getItem('pathologistOwnerName') ;
  }

  onlogout():any {
    localStorage.removeItem('patientUserName');
    localStorage.removeItem('pathologistOwnerName');
    
  }
}
