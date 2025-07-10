import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TravelRequest } from './models/travel-request';
import { Observable } from 'rxjs';
import { TravelResponse } from './models/travel-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = '/api/travel';

  getTravelPlan(travelRequest: TravelRequest) : Observable<TravelResponse> {
    return this.httpClient.post<TravelResponse>(this.url, travelRequest);
  }
}
