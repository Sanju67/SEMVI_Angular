import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ApplyTestComponent } from './apply-test/apply-test.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardPathologistComponent } from './dashboard-pathologist/dashboard-pathologist.component';
import { DashboardPatientComponent } from './dashboard-patient/dashboard-patient.component';
import { ConfirmPasswordComponent } from './forgot-password/confirm-password/confirm-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TestPriceComponent } from './test-price/test-price.component';

const routes: Routes = [
  { path : '' , component : HomeComponent} ,
  { path : 'Login' , component : LoginComponent} , 
  { path : 'DashboardPatient' , component : DashboardPatientComponent},
  { path : 'DashboardPathologist' , component : DashboardPathologistComponent},
  { path : 'Register' , component: RegisterComponent} ,
  { path : 'ForgotPassword' , component : ForgotPasswordComponent},
  { path : 'contact-us' , component : ContactUsComponent },
  { path : 'ConfirmPassword' , component : ConfirmPasswordComponent} ,
  { path : 'ApplyTest' , component : ApplyTestComponent } , 
  { path : 'About-Us' , component : AboutUsComponent},
  { path : 'TestPrice' , component : TestPriceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
