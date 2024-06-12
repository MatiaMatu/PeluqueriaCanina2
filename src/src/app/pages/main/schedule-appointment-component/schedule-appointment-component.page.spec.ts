import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleAppointmentComponentPage } from './schedule-appointment-component.page';

describe('ScheduleAppointmentComponentPage', () => {
  let component: ScheduleAppointmentComponentPage;
  let fixture: ComponentFixture<ScheduleAppointmentComponentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAppointmentComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
