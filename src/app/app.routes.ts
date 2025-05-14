import { Routes } from '@angular/router';
import { ReportFormComponent } from './report-form/report-form.component';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { BusScheduleComponent } from './bus-schedule/bus-schedule.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './admin/authGuard.guard';

export const routes: Routes = [
  {path: '', component: ForecastCardComponent},
  { path: 'login', component: AdminLoginComponent },
  { path: 'protected', component: AdminComponent, canActivate: [AuthGuard] }, //will redirect to login if not authenticated.
  { path: 'report-form', component: ReportFormComponent },
  { path: 'bus', component: BusScheduleComponent },
  
];
