import { Component, Input, OnInit } from '@angular/core';
import { CalendarComponent } from "@schedule-x/angular";
import { CalendarApp, CalendarEventExternal, createCalendar, createViewMonthGrid } from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import '@schedule-x/theme-default/dist/index.css';
import { CityPlanning } from '../../api/models/city-planning';

interface CityEvent {
  id: number,
  title: string,
  start: string,
  end: string,
  description: string,
  location: string,
  calendarId: string
};

@Component({
  selector: 'app-planning',
  imports: [CalendarComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent implements OnInit {
  @Input({ required: true }) cityPlanningArray!: CityPlanning[];

  cityEventArray: CalendarEventExternal[] = [];
  calendar!: CalendarApp;

  ngOnInit(): void {
    this.cityEventArray = this.mapCityPlanningArrayToCityEventArray(this.cityPlanningArray);

    this.calendar = createCalendar({
      events: this.cityEventArray,
      isDark: true,
      calendars: {
        planning: {
          colorName: 'planning',
          darkColors: {
            main: '#ffd7f5',
            onContainer: '#ffd7f5',
            container: '#810081'
          }
        }
      },
      views: [createViewMonthGrid()],
      plugins: [createEventModalPlugin()],
    });
  }

  mapCityPlanningArrayToCityEventArray(cityPlanningArray: CityPlanning[]): CityEvent[] {
    const cityEventArray: CityEvent[] = [];

    for (let id = 0; id < cityPlanningArray.length; id++) {
      const cityEvent = this.mapCityPlanningToCityEvent(cityPlanningArray[id], id);
      cityEventArray.push(cityEvent);
    }

    return cityEventArray;
  }

  mapCityPlanningToCityEvent(cityPlanning: CityPlanning, id: number): CityEvent {
    const location = `Recommended accommodation: ${cityPlanning.accommodation.name} (${cityPlanning.accommodation.website})`;

    const cityEvent: CityEvent = {
      id: id,
      title: cityPlanning.city,
      start: this.dateToString(cityPlanning.from),
      end: this.dateToString(cityPlanning.to),
      description: cityPlanning.description,
      location: location,
      calendarId: 'planning'
    }

    return cityEvent;
  }

  numberToStringWithPadding(num: number): string {
    return num.toString().padStart(2, '0');
  }

  dateToString(date: Date): string {
    const workingDate = new Date(date);

    const month = this.numberToStringWithPadding(workingDate.getMonth() + 1);
    const day = this.numberToStringWithPadding(workingDate.getDate() + 1);
    return `${workingDate.getFullYear()}-${month}-${day}`;
  }
}
