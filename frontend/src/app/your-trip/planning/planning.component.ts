import { Component } from '@angular/core';
import { CalendarComponent } from "@schedule-x/angular";
import { CalendarEventExternal, createCalendar, createViewMonthGrid} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import '@schedule-x/theme-default/dist/index.css';

@Component({
  selector: 'app-planning',
  imports: [CalendarComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss'
})
export class PlanningComponent {
  cities: CalendarEventExternal[] = [];
  calendar = createCalendar({
    events: [
      {
        id: '1',
        title: 'Paris',
        start: this.dateToString(new Date('2025-07-14T03:24:00')),
        end: this.dateToString(new Date('2025-07-23T03:24:00')),
        description: 'wsh'
      }
    ],
    views: [createViewMonthGrid()],
    plugins: [createEventModalPlugin],
  });

  ngOnInit(): void {
    this.cities = [
      {
        id: '1',
        title: 'Paris',
        start: this.dateToString(new Date('2025-07-14T03:24:00')),
        end: this.dateToString(new Date('2025-07-23T03:24:00')),
        description: 'wsh'
      }
    ];
  }

  numberToStringWithPadding(num: number): string {
    return num.toString().padStart(2, '0');
  }

  dateToString(date: Date): string {
    const month = this.numberToStringWithPadding(date.getMonth() + 1);
    const day = this.numberToStringWithPadding(date.getDate() + 1);
    return `${date.getFullYear()}-${month}-${day}`;
  }
}
