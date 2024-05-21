import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkoutPlanComponent } from './edit-workout-plan.component';

describe('EditWorkoutPlanComponent', () => {
  let component: EditWorkoutPlanComponent;
  let fixture: ComponentFixture<EditWorkoutPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditWorkoutPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditWorkoutPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
