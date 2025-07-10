import { Component, Input } from '@angular/core';
import { InterestPoints } from '../../api/models/interest-points';
import { Planning } from '../../api/models/planning';
import { LandmarkPanelComponent } from "./landmark-panel/landmark-panel.component";

@Component({
  selector: 'app-landmarks',
  imports: [LandmarkPanelComponent],
  templateUrl: './landmarks.component.html',
  styleUrl: './landmarks.component.scss'
})
export class LandmarksComponent {
  @Input({ required: true }) landmarks!: InterestPoints;
  @Input({ required: true }) planning!: Planning;
}
