import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciossPage } from './servicioss.page';

describe('ServiciossPage', () => {
  let component: ServiciossPage;
  let fixture: ComponentFixture<ServiciossPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciossPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
