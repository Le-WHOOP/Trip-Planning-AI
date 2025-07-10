import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Attraction } from '../../../api/models/attraction';


@Component({
  selector: 'app-landmark-card',
  imports: [MatCardModule],
  templateUrl: './landmark-card.component.html',
  styleUrl: './landmark-card.component.scss'
})
export class LandmarkCardComponent {
  @Input({ required: true }) landmark!: Attraction
}
