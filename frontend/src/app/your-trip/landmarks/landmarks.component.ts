import { Component, Input } from '@angular/core';
import { LandmarkPanelComponent } from './landmark-panel/landmark-panel.component';
import { Attraction } from '../../api/models/attraction';
import { CityPlanning } from '../../api/models/city-planning';

@Component({
  selector: 'app-landmarks',
  imports: [LandmarkPanelComponent],
  templateUrl: './landmarks.component.html',
  styleUrl: './landmarks.component.scss'
})
export class LandmarksComponent {
  @Input({ required: true }) landmarks!: Attraction[];
  @Input({ required: true }) planning!: CityPlanning[];
}
