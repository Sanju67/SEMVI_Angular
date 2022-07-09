import { HostListener, Component } from '@angular/core';
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
   
    constructor(private orderService: OrderService) {
 
    }
 
    options = {
    "key": "",
    "amount": "", 
    "name": "Java Chinna",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
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