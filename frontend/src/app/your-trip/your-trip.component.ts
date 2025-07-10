import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TravelStepsComponent } from './travel-steps/travel-steps.component';
import { PlanningComponent } from './planning/planning.component';
import { TravelResponse } from '../api/models/travel-response';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LandmarksComponent } from './landmarks/landmarks.component';

@Component({
  selector: 'app-your-trip',
  imports: [AsyncPipe, MatTabsModule, TravelStepsComponent, LandmarksComponent, PlanningComponent],
  templateUrl: './your-trip.component.html',
  styleUrl: './your-trip.component.scss'
})
export class YourTripComponent implements OnInit {
  public travelResponse$!: Observable<TravelResponse | null>;
  private apiService: ApiService = inject(ApiService);

  ngOnInit(): void {
    this.travelResponse$ = this.apiService.travelResponse$;
  }
}
