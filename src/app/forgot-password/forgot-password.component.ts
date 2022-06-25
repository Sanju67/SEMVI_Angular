import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  x: any ;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onLoginClick(pageName: string) : void{
    this.router.navigate([`${pageName}`]);
  }

  onGetNewPasswordClick(){
     this.x = document.getElementById("success");
    if (this.x.innerHTML === "") {
      this.x.innerHTML = " The Password reset link has been sent to your email address successfully...";
    }
  }
}
