import { InterestPoints } from "./interest-points";
import { Planning } from "./planning";
import { Travel } from "./travel";

export interface TravelResponse {
    interestPoints: InterestPoints,
    planning: Planning,
    travel: Travel
}