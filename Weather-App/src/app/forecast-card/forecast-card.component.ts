import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { Subject, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.css'
})
export class ForecastCardComponent implements OnInit {
  // Properties
  city: string = '';
  weatherData: any = null;
  forecastDays: any[] = [];
  suggestions: any[] = [];
  searchTerm = new Subject<string>();

  isNight: boolean = false;
  unitPreference: 'F' | 'C' = 'F';

  // Set up a debounced search to fetch city suggestions
  constructor(private weatherService: WeatherService) {
    this.searchTerm.pipe(
      debounceTime(300),
      switchMap(query => this.weatherService.searchCities(query))
    ).subscribe(results => {
      this.suggestions = results;
    });
  }

  // Load from local storage on initialization
  ngOnInit(): void {
    const savedCity = localStorage.getItem('lastCity');
    const savedUnit = localStorage.getItem('unitPreference');
    const darkModeSetting = localStorage.getItem('forceDark');

    if (savedCity) {
      this.city = savedCity;
      this.fetchWeather();
    }

    if (savedUnit === 'C' || savedUnit === 'F') {
      this.unitPreference = savedUnit;
    }

    if (darkModeSetting === 'true') {
      this.isNight = true;
      document.body.classList.add('night-theme');
    }
  }

  // Toggles darkmode manually and saves to local storage
  toggleTheme(): void {
    this.isNight = !this.isNight;
    localStorage.setItem('forceDark', this.isNight.toString());
    document.body.classList.toggle('night-theme', this.isNight);
  }

  // Toggles between Fahrenheit and Celsius and saves to local storage
  toggleUnit(unit: 'F' | 'C'): void {
    this.unitPreference = unit;
    localStorage.setItem('unitPreference', unit);
  }

  // Sets the theme based on the time of day
  setThemeBasedOnTime(): void {
    if (!this.weatherData?.location || !this.weatherData?.forecast) return;
    if (localStorage.getItem('forceDark') === 'true') return; // override by user

    const currentTime = new Date(this.weatherData.location.localtime);
    const forecast = this.weatherData.forecast.forecastday[0];
    const sunset = this.parse12HourTimeTo24Hour(forecast.astro.sunset);
    const sunrise = this.parse12HourTimeTo24Hour(forecast.astro.sunrise);
    const currentHour = currentTime.getHours();

    this.isNight = currentHour >= sunset || currentHour < sunrise;
    document.body.classList.toggle('night-theme', this.isNight);
  }

  // Converts 12-hour format to 24-hour format
  parse12HourTimeTo24Hour(timeStr: string): number {
    const [time, modifier] = timeStr.split(' ');
    let [hours] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    else if (modifier === 'AM' && hours === 12) hours = 0;

    return hours;
  }

  // Called on input change to fetch city suggestions
  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.city = input;
    if (input.length >= 2) {
      this.searchTerm.next(input);
    } else {
      this.suggestions = [];
    }
  }

  // Selects a city from the suggestions and fetches its weather data
  selectCity(city: any): void {
    this.city = city.name;
    this.suggestions = [];
    this.fetchWeather();
  }


  // Fetches weather data for the selected city
  fetchWeather() {
    if (!this.city.trim()) return;
    localStorage.setItem('lastCity', this.city);

    this.weatherService.getForecastByCity(this.city).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        this.forecastDays = data.forecast?.forecastday || [];
        this.setThemeBasedOnTime();
        console.log('Forecast:', this.forecastDays);
      },
      error: (err) => {
        console.error('Weather fetch failed:', this.city, err);
        this.weatherData = null;
        this.forecastDays = [];
      }
    });
  }
}
