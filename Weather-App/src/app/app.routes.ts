import { Routes } from '@angular/router';
import { ReportFormComponent } from './report-form/report-form.component';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { BusScheduleComponent } from './bus-schedule/bus-schedule.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  {path: '', component: ForecastCardComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'report-form', component: ReportFormComponent },
  { path: 'bus', component: BusScheduleComponent },
  
];
