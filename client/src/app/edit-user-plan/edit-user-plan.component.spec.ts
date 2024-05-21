import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPlanComponent } from './edit-user-plan.component';

describe('EditUserPlanComponent', () => {
  let component: EditUserPlanComponent;
  let fixture: ComponentFixture<EditUserPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
