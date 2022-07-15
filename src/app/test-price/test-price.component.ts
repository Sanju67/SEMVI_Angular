import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplyTestComponent } from '../apply-test/apply-test.component';

@Component({
  selector: 'app-test-price',
  templateUrl: './test-price.component.html',
  styleUrls: ['./test-price.component.css']
})
export class TestPriceComponent implements OnInit {

  apply!: ApplyTestComponent;
  constructor(private router : Router) { }
  ngOnInit(): void {
  }

  
  OnBasicTestSelected(){
    // console.log('basic inside testprice');
  localStorage.setItem("planSelected","Basic Blood Test Plan") ;
    this.navigateToApplyTest();
  }

  OnStandardTestSelected(){
    // console.log('standard inside testprice');
  localStorage.setItem("planSelected","Standard Blood Test Plan") ;
    this.navigateToApplyTest();
  }
  OnPremiumTestSelected(){
    // console.log('premium inside testprice');
  localStorage.setItem("planSelected","Premium Blood Test Plan") ;
    this.navigateToApplyTest();
  }

  navigateToApplyTest(){
    ApplyTestComponent.onPlanSelected();
    this.router.navigate([`ApplyTest`]);
  }
}
