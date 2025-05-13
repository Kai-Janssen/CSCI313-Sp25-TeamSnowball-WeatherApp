import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';


@Component({
  selector: 'app-forecast-card',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.css'
})
export class ForecastCardComponent {
  city: string = '';
  weatherData: any = null;
  forecastDays: any[] = [];

  constructor(private weatherService: WeatherService) {}

  fetchWeather() {
    if (!this.city.trim()) return;

    this.weatherService.getForecastByCity(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.forecastDays = (data as any).forecast?.forecastday || [];
        console.log('Forecast:', this.forecastDays);
      },
      error: (err) => {
        console.error('Weather fetch failed:', err);
        this.weatherData = null;
        this.forecastDays = [];
      }
    });
  }
}
