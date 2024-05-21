import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditDietPlanComponent } from './edit-diet-plan/edit-diet-plan.component';
import { EditWorkoutPlanComponent } from './edit-workout-plan/edit-workout-plan.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user/:mobileNumber', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'user/:mobileNumber/edit-diet-plan', component: EditDietPlanComponent, canActivate: [AuthGuard] },
  { path: 'user/:mobileNumber/edit-workout-plan', component: EditWorkoutPlanComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }  // Redirect any unknown paths to the home route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
