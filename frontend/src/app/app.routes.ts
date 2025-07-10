import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { YourTripComponent } from './your-trip/your-trip.component';
import { travelDataGuard } from './guards/travel-data.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'your-trip', component: YourTripComponent, canActivate: [travelDataGuard], },
];
