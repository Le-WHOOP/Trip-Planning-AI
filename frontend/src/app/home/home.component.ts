import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../api/api.service';
import { TravelRequest } from '../api/models/travel-request';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private readonly router: Router = inject(Router);
  readonly announcer = inject(LiveAnnouncer);
  private readonly apiService = inject(ApiService);
  today = new Date();
  filters = (d: Date | null): boolean => {
    return (d || new Date()) >= this.today;
  }

  readonly country = new FormControl('', Validators.required);
  readonly start = new FormControl(null, Validators.required);
  readonly end = new FormControl(null, Validators.required);
  readonly wishes = signal<string[]>([]);

  readonly countryError = signal('');
  readonly dateError = signal('');
  readonly wishesError = signal('');
  readonly loading = signal(false);

  constructor() {
    // Country
    merge(this.country.valueChanges, this.country.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateCountryError();
    });

    // Date
    merge(this.start.valueChanges, this.start.statusChanges, this.end.valueChanges, this.end.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateDateError();
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add a wish
    if (value) {
      this.wishes.update(wish => [...wish, value]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(wish: string): void {
    this.wishes.update(wishes => {
      const index = wishes.indexOf(wish);
      if (index < 0) {
        return wishes;
      }

      wishes.splice(index, 1);
      this.announcer.announce(`Removed ${wish}`);
      return [...wishes];
    });
  }

  updateCountryError() {
    this.countryError.set(
      this.country.hasError('required') ? 'Country is required' : ''
    );
  }

  updateDateError() {
    if (this.start.hasError('required') || this.end.hasError('required')) {
      this.dateError.set('Start and end dates are required');
    } else {
      this.dateError.set('');
    }
  }

  public async fetchData() {
    this.country.markAsTouched();
    this.start.markAsTouched();
    this.end.markAsTouched();
    this.updateCountryError();
    this.updateDateError();

    if (this.country.invalid || this.start.invalid || this.end.invalid || this.wishes().length === 0) {
      console.warn('Form invalid');
      return;
    }

    const travelRequest: TravelRequest = {
      country: this.country.value!,
      from: this.start.value!,
      to: this.end.value!,
      wishes: this.wishes().join(', ')
    };

    console.log('Form submitted', travelRequest);

    this.loading.set(true);
    await this.apiService.setTravelPlan(travelRequest);
    this.router.navigate(['/your-trip']);
  }
}
