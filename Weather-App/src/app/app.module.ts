import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ForecastCardComponent } from './forecast-card/forecast-card.component';

import { AppComponent } from './app.component';
import { ReportFormComponent } from './report-form/report-form.component'; // Update if path differs
import { routes } from './app.routes';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
	FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
	HttpClientModule,
	ForecastCardComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }