import { Accommodation } from "./accommodation";

export interface CityPlanning {
  city: string,
  from: Date,
  to: Date,
  description: string,
  accommodation: Accommodation
}
