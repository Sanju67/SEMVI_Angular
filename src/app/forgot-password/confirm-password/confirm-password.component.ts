import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onUpdatePasswordButtonClick(pageName:string) : void{
    this.router.navigate([`${pageName}`]);
  }
}
