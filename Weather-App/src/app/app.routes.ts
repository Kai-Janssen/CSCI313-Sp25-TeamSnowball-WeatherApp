import { Routes } from '@angular/router';
import { OnInit } from '@angular/core';
import { ReportFormComponent } from './report-form/report-form.component';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';
import { BusScheduleComponent } from './bus-schedule/bus-schedule.component';

export const routes: Routes = [
  {path: '', component: ForecastCardComponent},
  { path: 'report-form', component: ReportFormComponent },
  { path: 'bus', component: BusScheduleComponent }
];
