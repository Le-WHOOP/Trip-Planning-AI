import { Component } from '@angular/core';

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
  displayedColumns: string[] = ['fromCity', 'toCity', 'transportationType', 'travelTime', 'price', 'website'];

  trips: Trip[] = [
    {
      fromCity: 'Tokyo',
      toCity: 'Kyoto',
      transportationType: 'Shinkansen',
      travelTime: '2h 15m',
      price: '¥14,000',
      website: 'https://www.japanrailpass.net'
    },
  ];
}
