import { Component, Input } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Trip } from '../../api/models/trip';

@Component({
  selector: 'app-travel-steps',
  imports: [
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './travel-steps.component.html',
  styleUrl: './travel-steps.component.scss'
})
export class TravelStepsComponent {
  public displayedColumns: string[] = ['fromCity', 'toCity', 'transportationType', 'travelTime', 'price', 'website'];
  @Input({ required: true }) trips: Trip[] = [];
}
