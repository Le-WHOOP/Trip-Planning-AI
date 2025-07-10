import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { TravelStepsComponent } from './travel-steps/travel-steps.component';

@Component({
  selector: 'app-your-trip',
  imports: [MatTabsModule, TravelStepsComponent],
  templateUrl: './your-trip.component.html',
  styleUrl: './your-trip.component.scss'
})
export class YourTripComponent {

}
