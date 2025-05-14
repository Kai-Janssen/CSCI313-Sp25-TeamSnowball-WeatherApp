import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { Subject, debounceTime, switchMap } from 'rxjs';


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

  searchTerm = new Subject<string>();
  suggestions: any[] = [];
  isNight: boolean = false;

  ngOnInit(): void {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      this.city = savedCity;
      this.fetchWeather();
    }
  }

  constructor(private weatherService: WeatherService) {
	this.searchTerm.pipe(
		debounceTime(300),
		switchMap(query => this.weatherService.searchCities(query))
	).subscribe(results => {
		this.suggestions = results;
	});
  }

  // Theme switch
  toggleTheme(): void {
    this.isNight = !this.isNight;
    document.body.classList.toggle('night-theme', this.isNight);
  }

  // Logic to set the theme based on time
  setThemeBasedOnTime(): void {
    if (!this.weatherData?.location || !this.weatherData?.forecast) return;

    const currentTime = new Date(this.weatherData.location.localtime);
    const forecast = this.weatherData.forecast.forecastday[0];
    const sunset = forecast.astro.sunset;
    const sunrise = forecast.astro.sunrise;

    const sunsetHours = this.parse12HourTimeTo24Hour(sunset);
    const sunriseHours = this.parse12HourTimeTo24Hour(sunrise);
    const currentHour = currentTime.getHours();

    this.isNight = currentHour >= sunsetHours || currentHour < sunriseHours;
    document.body.classList.toggle('night-theme', this.isNight);
  }

  // Helper method to convert 12-hour format to 24-hour format
  parse12HourTimeTo24Hour(timeStr: string): number {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours;
  }

  // Search logic
  onSearch(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.city = input;
    if (input.length >= 2) {
      this.searchTerm.next(input);
    } else {
      this.suggestions = [];
    }
  }

  selectCity(city: any): void {
    this.city = city.name;
    this.suggestions = [];
    this.fetchWeather();
  }

  // Fetch weather data
  fetchWeather() {
    if (!this.city.trim()) return;

	// Save to local storage
	localStorage.setItem('lastCity', this.city);


    this.weatherService.getForecastByCity(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.forecastDays = (data as any).forecast?.forecastday || [];
		this.setThemeBasedOnTime();
        console.log('Forecast:', this.forecastDays);
      },
      error: (err) => {
        if (this.city) console.error('Weather fetch failed:', this.city, err);
        this.weatherData = null;
        this.forecastDays = [];
      }
    });
  }
}
