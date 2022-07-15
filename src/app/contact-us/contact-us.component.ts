import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup , Validators} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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


   contactUsForm = new UntypedFormGroup({
     userName : new UntypedFormControl('',[Validators.required]),
     userEmail : new UntypedFormControl('',[Validators.required,Validators.email]),
     userPhoneNo : new UntypedFormControl('',[
       Validators.required,
       Validators.minLength(10),
       Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$'),
       Validators.maxLength(10)]),
     userMessage : new UntypedFormControl('',[Validators.required]),
   })

  messageSubmit(){
    console.log(this.contactUsForm.value) ;
    Swal.fire(
      'Thank You...',
      'Your feedback is submitted !',
      'success'
    )
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
