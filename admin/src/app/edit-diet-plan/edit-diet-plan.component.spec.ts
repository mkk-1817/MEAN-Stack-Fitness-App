import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDietPlanComponent } from './edit-diet-plan.component';

describe('EditDietPlanComponent', () => {
  let component: EditDietPlanComponent;
  let fixture: ComponentFixture<EditDietPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDietPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDietPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
