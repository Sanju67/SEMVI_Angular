import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
 
const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
declare var Razorpay: any;
 
@Injectable({
providedIn: 'root'
})
export class OrderService {
    private url: string = `${environment.api_url}`;
    constructor(private http: HttpClient) {
 
    }
   
    createOrder(order : any): Observable<any> {
        console.log("create order service called",order,)
        return this.http.post(this.url + "createOrder" ,  {
        customerName: order.name,
        email: order.email,
        phoneNumber: order.phone,
        amount: order.amount
        }, httpOptions);
    }
   
    updateOrder(order : any): Observable<any> {
        return this.http.put(this.url + "updateOrder" , {
        razorpayOrderId: order.razorpay_order_id,
        razorpayPaymentId: order.razorpay_payment_id,
        razorpaySignature: order.razorpay_signature
        }, httpOptions);
    }
}