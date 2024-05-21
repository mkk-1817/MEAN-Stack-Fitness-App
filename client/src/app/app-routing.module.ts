import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DietPlanComponent } from './diet-plan/diet-plan.component';
import { WorkoutComponent } from './workout/workout.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditUserPlanComponent } from './edit-user-plan/edit-user-plan.component';
import { LoginSelectionComponent } from './login-selection/login-selection.component';

const routes: Routes = [
  { path: '', component: LoginSelectionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'diet-plan', component: DietPlanComponent },
  { path: 'workout', component: WorkoutComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'edit-user-plan', component: EditUserPlanComponent },
  { path: '', redirectTo: '/admin-dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
