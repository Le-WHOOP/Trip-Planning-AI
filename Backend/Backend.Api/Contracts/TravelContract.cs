namespace Backend.Api.Contracts;

public class Travel
{
    public List<TripContract> Trips { get; set; } = default!;

    public string Advice { get; set; } = default!;
}
