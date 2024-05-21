import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkoutComponent } from './workout/workout.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditUserPlanComponent } from './edit-user-plan/edit-user-plan.component';
import { LoginSelectionComponent } from './login-selection/login-selection.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DietPlanComponent,
    ProfileComponent,
    WorkoutComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    UserManagementComponent,
    EditUserPlanComponent,
    LoginSelectionComponent,
    EditPlanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
