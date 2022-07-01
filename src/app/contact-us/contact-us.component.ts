import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Contactus } from '../class/contactus';
import { ContactusService } from '../service/contactus.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactus : Contactus = new Contactus("","","","") ;

  
  constructor(private router : Router, private contactusService : ContactusService) { }

  ngOnInit(): void {
  }


   contactUsForm = new FormGroup({
     userName : new FormControl('',[Validators.required]),
     userEmail : new FormControl('',[Validators.required,Validators.email]),
     userPhoneNo : new FormControl('',[
       Validators.required,
       Validators.minLength(10),
       Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
       Validators.maxLength(10)]),
     userMessage : new FormControl('',[Validators.required]),
   })

  messageSubmit(){
    console.log(this.contactUsForm.value) ;
    alert("Thanks for your FeedBack !! ") ;
    this.contactUsForm.reset();
  }

  get userName(){
    return this.contactUsForm.get('userName') ;
  }

  get userEmail(){
    return this.contactUsForm.get('userEmail') ;
  }

  get userPhoneNo(){
    return this.contactUsForm.get('userPhoneNo') ;
  }

  get userMessage(){
    return this.contactUsForm.get('userMessage') ;
  }

  OnSendMessageButtonClick(){
    let resp = this.contactusService.addFeedback(this.contactus) ;
    resp.subscribe(data => {
        console.log("FeedBack added successfully ." , data);
    });
  }
}
