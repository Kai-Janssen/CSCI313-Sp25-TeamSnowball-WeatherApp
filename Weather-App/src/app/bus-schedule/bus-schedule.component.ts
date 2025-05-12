import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusRouteService, Stop } from './bus-routes.service';

@Component({
  selector: 'app-bus-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bus-schedule.component.html',
  styleUrls: ['./bus-schedule.component.css']
})
export class BusScheduleComponent {
  currentStop = 'NDSU';
  routeData: { [routeName: string]: Stop[] } = {};
  searchTerm: string = '';
  selectedRoute: string | null = null;

  constructor(private routeService: BusRouteService) {
    this.routeData = this.routeService.getRoutes();
  }

  selectRoute(routeName: string): void {
    this.selectedRoute = routeName;
    this.searchTerm = ''; // clear search when selecting route
  }

  get filteredStops(): { route: string; time: string; destination: string }[] {
    const allStops: { route: string; time: string; destination: string }[] = [];

    for (const routeName in this.routeData) {
      const stops = this.routeData[routeName];
      for (const stop of stops) {
        allStops.push({ route: routeName, ...stop });
      }
    }

    if (this.searchTerm) {
      return allStops.filter(stop =>
        stop.destination.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedRoute && this.routeData[this.selectedRoute]) {
      return this.routeData[this.selectedRoute].map(stop => ({
        route: this.selectedRoute!,
        ...stop
      }));
    }

    return [];
  }
}