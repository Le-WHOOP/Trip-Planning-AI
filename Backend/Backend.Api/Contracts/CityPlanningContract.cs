namespace Backend.Api.Contracts;

public class CityPlanningContract
{
    public string City { get; set; } = default!;

    public DateOnly From { get; set; } = default!;

    public DateOnly To { get; set; } = default!;

    public string Description { get; set; } = default!;

    public AccommodationContract Accommodation { get; set; } = default!;
}
