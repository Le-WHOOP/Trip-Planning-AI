import { Component, inject } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { LandmarksComponent } from "./landmarks/landmarks.component";
import { TravelResponse } from '../api/models/travel-response';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-your-trip',
  imports: [MatTabsModule, LandmarksComponent],
  templateUrl: './your-trip.component.html',
  styleUrl: './your-trip.component.scss'
})
export class YourTripComponent {
  response!: TravelResponse;
  travelService: ApiService = inject(ApiService);
}
