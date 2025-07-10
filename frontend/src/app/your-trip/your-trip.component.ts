import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { LandmarksComponent } from "./landmarks/landmarks.component";
import { TravelResponse } from '../api/models/travel-response';

@Component({
  selector: 'app-your-trip',
  imports: [MatTabsModule, LandmarksComponent],
  templateUrl: './your-trip.component.html',
  styleUrl: './your-trip.component.scss'
})
export class YourTripComponent {
  response!: TravelResponse;
}
