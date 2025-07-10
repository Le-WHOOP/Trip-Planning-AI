import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TravelRequest } from './models/travel-request';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { TravelResponse } from './models/travel-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = '/api/travel';

  private travelResponseSource = new BehaviorSubject<TravelResponse | null>(null);
  travelResponse$ = this.travelResponseSource.asObservable();

  private getTravelPlan(travelRequest: TravelRequest): Observable<TravelResponse> {
    return this.httpClient.post<TravelResponse>(this.url, travelRequest);
  }

  public async setTravelPlan(travelRequest: TravelRequest): Promise<void> {
    const travelResponse = await firstValueFrom(this.getTravelPlan(travelRequest));
    this.travelResponseSource.next(travelResponse);
    console.log(travelResponse);
  }

  public hasTravelPlan(): boolean {
    return this.travelResponseSource.getValue() !== null;
  }
}
