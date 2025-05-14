import { Injectable } from '@angular/core';

export interface Stop {
  time: string;
  destination: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusRouteService {
  routeData: { [routeName: string]: Stop[] } = {
    'Route 13': [
      { time: '10:15 AM', destination: 'GTC' },
      { time: '10:20 AM', destination: 'Barry Hall' },
      { time: '10:25 AM', destination: 'Minard Pullout East' },
      { time: '10:29 AM', destination: 'SHAC Shelter' },
      { time: '10:35 AM', destination: 'NDSU Transit Hub' },
      { time: '10:37 AM', destination: 'Roosevelt Park Shelter' },
      { time: '10:42 AM', destination: 'Fargo North High School' },
      { time: '10:43 AM', destination: 'NorthPort Shelter' },
      { time: '10:47 AM', destination: 'U32 Apartments' },
      { time: '10:54 AM', destination: 'SHAC Shelter' },
      { time: '11:00 AM', destination: 'NDSU Transit Hub' },
      { time: '11:03 AM', destination: 'Family Fare Shelter' },
      { time: '11:06 AM', destination: 'Renaissance Hall' },
      { time: '11:10 AM', destination: 'GTC' }
    ],
    'Route 31': [
      { time: '10:10 AM', destination: 'NDSU Minard Pullout West' },
      { time: '10:14 AM', destination: 'Wallman Wellness Center' },
      { time: '10:16 AM', destination: 'Peltier Complex' },
      { time: '10:20 AM', destination: 'Research Park' },
      { time: '10:22 AM', destination: 'FargoDome' },
      { time: '10:27 AM', destination: 'University Village' },
      { time: '10:31 AM', destination: 'NDSU High Rises' },
      { time: '10:35 AM', destination: 'NDSU Minard Pullout West' }
    ],
    'Route 33': [
      { time: '10:15 AM', destination: 'NDSU Transit Hub' },
      { time: '10:19 AM', destination: 'Klai Hall' },
      { time: '10:23 AM', destination: 'NDSU R.H. Barry Hall' },
      { time: '10:30 AM', destination: 'University Village' },
      { time: '10:31 AM', destination: 'SHAC' },
      { time: '10:32 AM', destination: 'Centennial Blvd' },
      { time: '10:35 AM', destination: 'NDSU Transit Hub' },
    ],'Route 34': [
      { time: '10:24 AM', destination: 'NDSU Transit Hub' },
      { time: '10:27 AM', destination: 'NDSU Reed & Johnson Hall' },
      { time: '10:30 AM', destination: 'FargoDome (East)' },
      { time: '10:33 AM', destination: 'NDSCS Main Entrance' },
      { time: '10:36 AM', destination: 'Niskanen' },
      { time: '10:39 AM', destination: 'Centennial Blvd' },
      { time: '10:41 AM', destination: 'NDSU Transit Hub' }
    ],
  };
  getRoutes() {
    return this.routeData;
  }
}

  