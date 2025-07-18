import { Component, Input, OnInit } from '@angular/core';
import { LandmarkCardComponent } from "../landmark-card/landmark-card.component";
import {MatExpansionModule} from '@angular/material/expansion';
import { CityPlanning } from '../../../api/models/city-planning';
import { Attraction } from '../../../api/models/attraction';


@Component({
  selector: 'app-landmark-panel',
  imports: [LandmarkCardComponent, MatExpansionModule],
  templateUrl: './landmark-panel.component.html',
  styleUrl: './landmark-panel.component.scss'
})
export class LandmarkPanelComponent implements OnInit {
  @Input({ required: true }) cityPlanning!: CityPlanning;
  @Input({required : true}) landmarks!: Attraction[];
  matchingLandmarks : Attraction[] = [];
  from = "";
  to = "";

  ngOnInit() {
    this.matchingLandmarks = this.landmarks.filter(attraction => attraction.city === this.cityPlanning.city);
    this.from = this.formatDate(new Date(this.cityPlanning.from));
    this.to = this.formatDate(new Date(this.cityPlanning.to));
  }

  formatDate(date: Date): string {
    return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
  }
}
