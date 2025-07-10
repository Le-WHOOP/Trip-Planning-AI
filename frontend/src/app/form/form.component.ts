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
import { TravelResponse } from '../api/models/travel-response';

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
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);
  private readonly apiService = inject(ApiService);

  readonly country = new FormControl('', Validators.required);
  readonly start = new FormControl(null, Validators.required);
  readonly end = new FormControl(null, Validators.required);
  readonly wishes = signal<string[]>([]);

  readonly countryError = signal('');
  readonly dateError = signal('');
  readonly wishesError = signal('');

  constructor() {
    // Country
    merge(this.country.valueChanges, this.country.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.countryError.set(
          this.country.hasError('required') ? 'Country is required' : ''
        );
      });

    // Date
    merge(this.start.valueChanges, this.start.statusChanges, this.end.valueChanges, this.end.statusChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        if (this.start.hasError('required') || this.end.hasError('required')) {
          this.dateError.set('Start and end dates are required');
        } else {
          this.dateError.set('');
        }
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

  updateWishesError() {
    this.wishesError.set(this.wishes().length === 0 ? 'At least one wish is required' : '');
  }

  fetchData() {
    this.country.markAsTouched();
    this.start.markAsTouched();
    this.end.markAsTouched();
    this.updateWishesError();

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

    this.apiService.getTravelPlan(travelRequest).subscribe({
      next: (response: TravelResponse) => {
        console.log('API response:', response);
      },
      error: (error) => {
        console.error('API error:', error);
      }
    });
  }
}