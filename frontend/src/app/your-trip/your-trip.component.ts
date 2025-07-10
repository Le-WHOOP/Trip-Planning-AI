import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PlanningComponent } from './planning/planning.component';

@Component({
  selector: 'app-your-trip',
  imports: [MatTabsModule, PlanningComponent],
  templateUrl: './your-trip.component.html',
  styleUrl: './your-trip.component.scss'
})
export class YourTripComponent {

}
