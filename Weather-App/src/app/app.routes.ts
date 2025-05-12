import { Routes } from '@angular/router';
import { OnInit } from '@angular/core';
import { ReportFormComponent } from './report-form/report-form.component';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';

export const routes: Routes = [
  {path: '', component: ForecastCardComponent},
  { path: 'report-form', component: ReportFormComponent }
];
