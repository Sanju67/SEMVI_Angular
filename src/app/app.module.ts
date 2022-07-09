import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmPasswordComponent } from './forgot-password/confirm-password/confirm-password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { ApplyTestComponent } from './apply-test/apply-test.component';
import { DashboardPatientComponent } from './dashboard-patient/dashboard-patient.component';
import { DashboardPathologistComponent } from './dashboard-pathologist/dashboard-pathologist.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { FooterComponent } from './home/footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TestPriceComponent } from './test-price/test-price.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ConfirmPasswordComponent,
    ContactUsComponent,
    ApplyTestComponent,
    DashboardPatientComponent,
    DashboardPathologistComponent,
    NavbarComponent,
    FooterComponent,
    AboutUsComponent,
    TestPriceComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
