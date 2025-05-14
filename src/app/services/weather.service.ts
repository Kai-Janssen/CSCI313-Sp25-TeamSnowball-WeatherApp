import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '7b6d27f49921496eb1624140251305';
  private apiUrl = 'https://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  getForecastByCity(city: string) {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(city)}&days=5`;
    return this.http.get(url);
  }

  searchCities(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.json`, {
      params: {
        key: this.apiKey,
        q: query
      }
    });
  }
}
