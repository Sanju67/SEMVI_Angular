import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../service/patient.service';
import { PathologistService } from '../service/pathologist.service';
import { TestService } from '../service/test.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  showbuttonClick=false ;
  userOption : any ;
  testOption : any ;
  paymentOption :  any ;
  allPatient : any ;
  allPatientIsNotNull : boolean = false ;
  chooseValidUserOptionMessage : boolean = false ;
  noUserFound : boolean = false ;
  
  // All Test variables
  allTestRecord : any ;
  allTestRecordFound : boolean = false ;
  testRecordMonthly: any[]= [] ;
  testRecordSixMonth : any[]= [] ;
  testRecordYearly : any []= [] ;
  testRecordMonthlyFound : boolean = false ;
  testRecordSixMonthFound : boolean = false ;
  testRecordYearlyFound : boolean = false ;
  invalidTestOptionSelected : boolean = false ;

  // All Payment Variable 

  allPaymentRecord : any;
  paymentRecordMonthly : any; 
  paymentRecordSixMonth : any ;
  paymentRecordYearly : any;
  
  nowDate = new Date(); 
  // todayDate =(this.nowDate.getDate()+'/'+(this.nowDate.getMonth()+1))+'/'+ this.nowDate.getFullYear();
  
  // Date Variables 
  currentMonth : any = this.nowDate.getMonth()+1 ;
  lastSixMonth : any = this.nowDate.getMonth()-5 ;
  currentYear : any = this.nowDate.getFullYear();
  
 
  constructor(private router : Router , private patientService : PatientService,private pathologistService : PathologistService, private testService : TestService) { }

  ngOnInit(): void {
    console.log("Current Month : " , this.currentMonth);
    console.log("Last six month",this.lastSixMonth);
    console.log("Current Year : ",this.currentYear);
  }

  userSelection(event : any){
    this.userOption = event.target.value;
   
  }

  testSelection(event : any){
    this.showbuttonClick = false;
    this.testOption = event.target.value;
  }

  showAllUser(){
    
    console.log("Option selected : ",this.userOption);
    if(this.userOption == 1){
      this.chooseValidUserOptionMessage = false;
      this.noUserFound = false ;
      console.log("make service call to get all user data") ;
      let resp = this.patientService.getPatients() ;
      resp.subscribe(data => {
        this.allPatient = data;
        console.log("All Patient  : ", data) ;
        this.allPatientIsNotNull =true ;
    });
  } else if(this.userOption != 1){
    this.chooseValidUserOptionMessage = true ;
    this.allPatientIsNotNull = false ;
  } else if(this.allPatient == null){
    this.noUserFound = true ;
  }
}

  showTestRecord() {
    this.showbuttonClick = true ;
    console.log("Option selected for test showing is : ",this.testOption) ;
    // Test Option for Monthly record
    if(this.testOption == 1){
      this.allTestRecordFound = false ;
      this.invalidTestOptionSelected=false;
      this.testRecordYearlyFound = false ;
      this.testRecordSixMonthFound = false ;

      let resp = this.testService.getAllRequestTest() ;
      
      resp.subscribe(data => {
        this.allTestRecord = data;
        if(this.allTestRecord != null){
          let numberofRecord = Object.keys(data).length ;
          let j = 0 ;
          for(let i=0 ;i<numberofRecord;i++){
              console.log("Test Date found : ",this.allTestRecord[i].testDate);
              let testMonth ="12"
              testMonth= this.allTestRecord[i].testDate ? this.allTestRecord[i].testDate.substring(3, 5) : '';
              console.log("Test month found : ",testMonth) ;
             
              if(testMonth == this.currentMonth){
                this.testRecordMonthly[j] = this.allTestRecord[i];
                j++;
                this.testRecordMonthlyFound = true ;
              } else {
                console.log("no record found");
              }
          }
        }    
      });

    // Test OPtion for last 6 month
    } else if(this.testOption == 2){
      this.allTestRecordFound = false ;
      this.invalidTestOptionSelected=false;
      this.testRecordMonthlyFound =  false;
      this.testRecordYearlyFound = false ;

      let resp = this.testService.getAllRequestTest() ;
      
      resp.subscribe(data => {
        this.allTestRecord = data;
        if(this.allTestRecord != null){
          let numberofRecord = Object.keys(data).length ;
          let j = 0 ;
          for(let i=0 ;i<numberofRecord;i++){
              console.log("Test Date found : ",this.allTestRecord[i].testDate);
              let testYear ="12";
              testYear= this.allTestRecord[i].testDate ? this.allTestRecord[i].testDate.substring(6,10): '';
              let testMonth = "1" ;
              testMonth = this.allTestRecord[i].testDate ? this.allTestRecord[i].testDate.substring(3, 5) : '';
              console.log("testMOnth : " , testMonth) ;
              console.log("Current month : " , this.currentMonth)
              if((this.currentMonth - parseInt(testMonth)) <= 6 && (this.currentMonth - parseInt(testMonth)) > 0 && testYear == this.currentYear){
                this.testRecordSixMonth[j] = this.allTestRecord[i];
                j++;
                this.testRecordSixMonthFound = true ;
              } else {
                console.log("no record found");
                this.testRecordSixMonthFound =false;
              }
          }
        }    
      });
      

      // Test Option for current year
    }else if(this.testOption == 3){
      this.allTestRecordFound = false ;
      this.invalidTestOptionSelected=false;
      this.testRecordMonthlyFound =  false;
      this.testRecordSixMonthFound = false ;

      let resp = this.testService.getAllRequestTest() ;
      
      resp.subscribe(data => {
        this.allTestRecord = data;
        if(this.allTestRecord != null){
          let numberofRecord = Object.keys(data).length ;
          let j = 0 ;
          for(let i=0 ;i<numberofRecord;i++){
              console.log("Test Date found : ",this.allTestRecord[i].testDate);
              let testYear ="12";
              testYear= this.allTestRecord[i].testDate ? this.allTestRecord[i].testDate.substring(6,10): '';
              console.log("Test month found : ",testYear) ;
             
              if(testYear == this.currentYear){
                this.testRecordYearly[j] = this.allTestRecord[i];
                j++;
                this.testRecordYearlyFound = true ;
              } else {
                console.log("no record found");
                this.testRecordMonthlyFound =false;
              }
          }
        }    
      });

      console.log("show yearly record")
      // Test option for all test record
    }else if(this.testOption == 4){
      this.invalidTestOptionSelected=false;
      this.testRecordMonthlyFound =  false;
      this.testRecordYearlyFound = false ;
      this.testRecordSixMonthFound = false ;

      console.log("Show all test record") ;
      let resp = this.testService.getAllRequestTest() ;
      resp.subscribe(data => {
        this.allTestRecord = data;
        if(this.allTestRecord != null){
          this.allTestRecordFound = true ;
        }
        
        console.log("All test data  : ", data) ;
        
    });
    } else{
      this.invalidTestOptionSelected=true;
      this.allTestRecordFound = false ;
      this.testRecordMonthlyFound =  false;
      this.testRecordYearlyFound = false ;
      this.testRecordSixMonthFound = false ;
    }

  }

}
