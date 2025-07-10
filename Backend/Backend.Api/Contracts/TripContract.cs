namespace Backend.Api.Contracts;

public class TripContract
{
    public string FromCity { get; set; } = default!;

    public string ToCity { get; set; } = default!;

    public string TransportationType { get; set; } = default!;

    public string TravelTime { get; set; } = default!;

    public string Price { get; set; } = default!;

    public string Website { get; set; } = default!;
}
