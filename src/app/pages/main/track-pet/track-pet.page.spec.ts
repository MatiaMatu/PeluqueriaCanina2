import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackPetPage } from './track-pet.page';

describe('TrackPetPage', () => {
  let component: TrackPetPage;
  let fixture: ComponentFixture<TrackPetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
