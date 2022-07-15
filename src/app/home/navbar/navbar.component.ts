import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully !!',
      showConfirmButton: false,
      timer: 200000
    })
  localStorage.clear() ;
  this.router.navigate([`/Home`]);
    
  }
}
