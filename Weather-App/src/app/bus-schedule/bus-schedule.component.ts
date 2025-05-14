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
    // Default stop used for filtering or display
  currentStop = 'NDSU';

  // stores route names and array of stops
  routeData: { [routeName: string]: Stop[] } = {};

  // Search term for filtering destinations
  searchTerm: string = '';

  // Name of the currently selected route 
  selectedRoute: string | null = null;

  // Inject the BusRouteService to retrieve bus route data
  constructor(private routeService: BusRouteService) {
    this.routeData = this.routeService.getRoutes();
  }

  // Updates the currently selected route and clears any search term.
  selectRoute(routeName: string): void {
    this.selectedRoute = routeName;
    this.searchTerm = ''; 
  }

  /*
   * property that returns a filtered list of stops based on either:
   *  - the current searched destination or
   *  - the currently selected route.
   * 
   * returns empty if no search/no route selected.
   */
  get filteredStops(): { route: string; time: string; destination: string }[] {
    const allStops: { route: string; time: string; destination: string }[] = [];

    // combining all routes and stops into a single array
    for (const routeName in this.routeData) {
      const stops = this.routeData[routeName];
      for (const stop of stops) {
        allStops.push({ route: routeName, ...stop });
      }
    }

    //filter stops by destination
    if (this.searchTerm) {
      return allStops.filter(stop =>
        stop.destination.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // If a route is selected, return just that route's stops
    if (this.selectedRoute && this.routeData[this.selectedRoute]) {
      return this.routeData[this.selectedRoute].map(stop => ({
        route: this.selectedRoute!,
        ...stop
      }));
    }

    //return an empty array
    return [];
  }
}