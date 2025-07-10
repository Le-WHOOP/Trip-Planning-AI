import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { YourTripComponent } from './your-trip/your-trip.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'your-trip', component: YourTripComponent }
];
