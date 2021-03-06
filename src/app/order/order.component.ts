import { HostListener, Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';
 
declare var Razorpay: any;
 
@Component({
selector: 'app-order',
templateUrl: './order.component.html',
styleUrls: ['./order.component.css']
})
export class OrderComponent {
 
    form: any = {}; 
    paymentId: string = "";
    error: string ="";
    currentPatient : any
    constructor(private orderService: OrderService,private router : Router) {
 
    }

    ngOnInit(): void {
          this.form.name = sessionStorage.getItem("tempPatientName") || "";
          this.form.phone = sessionStorage.getItem("tempContactNo") || "";
          const plan = localStorage.getItem("planSelected");
          if(plan == "Basic Blood Test Plan"){
            this.form.amount = 1000 ;
          } else if (plan == "Standard Blood Test Plan"){
            this.form.amount = 1500 ;
          }
          else if(plan == "Premium Blood Test Plan"){
            this.form.amount = 2000 ;
          }
      }
 
    options = {
    "key": "",
    "amount": "", 
    "name": "Blood Test Managment System",
    "description": "Web application",
    "image": "assets/logo.png",
    "order_id":"",
    "handler": function (response : any){
        var event = new CustomEvent("payment.success", 
            {
                detail: response,
                bubbles: true,
                cancelable: true
            }
        );    
        window.dispatchEvent(event);
    }
    ,
    "prefill": {
    "name": "",
    "email": "",
    "contact": ""
    },
    "notes": {
    "address": ""
    },
    "theme": {
    "color": "#3399cc"
    }
    };
 
    onSubmit(): void {
      console.log("Pay button click")
        this.paymentId = ''; 
        this.error = ''; 
        this.orderService.createOrder(this.form).subscribe(
        (data : any) => {
            this.options.key = data.secretKey;
            this.options.order_id = data.razorpayOrderId;
            this.options.amount = data.applicationFee; //paise
            this.options.prefill.name = this.form.name;
            this.options.prefill.email = this.form.email;
            this.options.prefill.contact = this.form.phone;
            console.log("Options value is : ",this.options)
            var rzp1 = new Razorpay(this.options);
            rzp1.open();
            localStorage.setItem("paid","true") ;     
            this.router.navigate([`/ApplyTest`]);                 
            rzp1.on('payment.failed', function (response : any){    
                // Todo - store this information in the server
                console.log(response.error.code);    
                console.log(response.error.description);    
                console.log(response.error.source);    
                console.log(response.error.step);    
                console.log(response.error.reason);    
                console.log(response.error.metadata.order_id);    
                console.log(response.error.metadata.payment_id);
               // this.error = response.error.reason;
            }
            );
        }
        ,
        (err : any) => {
            this.error = err.error.message;
        }
        );
    }
 
    @HostListener('window:payment.success', ['$event']) 
    onPaymentSuccess(event : any): void {
        this.orderService.updateOrder(event.detail).subscribe(
        (data : any) => {
            this.paymentId = data.message;
        }
        ,
        (err : any) => {
            this.error = err.error.message;
        }
        );
    }
}