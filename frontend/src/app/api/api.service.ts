import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TravelRequest } from './models/travel-request';
import { BehaviorSubject, Observable } from 'rxjs';
import { TravelResponse } from './models/travel-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'http://localhost:8080/travel';

  private travelResponseSource = new BehaviorSubject<TravelResponse>(null!);
  travelResponse$ = this.travelResponseSource.asObservable();

  private getTravelPlan(travelRequest: TravelRequest) : Observable<TravelResponse> {
    return this.httpClient.post<TravelResponse>(this.url, travelRequest);
  }

  public setTravelPlan(travelRequest: TravelRequest) {
    this.getTravelPlan(travelRequest).subscribe(travelResponse => this.travelResponseSource.next(travelResponse));
  }
}
