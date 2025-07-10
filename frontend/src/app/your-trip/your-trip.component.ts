import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TravelStepsComponent } from './travel-steps/travel-steps.component';
import { PlanningComponent } from './planning/planning.component';
import { TravelResponse } from '../api/models/travel-response';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-your-trip',
  imports: [AsyncPipe, MatTabsModule, TravelStepsComponent, PlanningComponent],
  templateUrl: './your-trip.component.html',
  styleUrl: './your-trip.component.scss'
})
export class YourTripComponent {
  public travelResponse$!: Observable<TravelResponse | null>;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.travelResponse$ = this.apiService.travelResponse$;
  }
}
