import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPathologistComponent } from './dashboard-pathologist.component';

describe('DashboardPathologistComponent', () => {
  let component: DashboardPathologistComponent;
  let fixture: ComponentFixture<DashboardPathologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPathologistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPathologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
