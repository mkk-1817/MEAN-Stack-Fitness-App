import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSelectionComponent } from './login-selection.component';

describe('LoginSelectionComponent', () => {
  let component: LoginSelectionComponent;
  let fixture: ComponentFixture<LoginSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
