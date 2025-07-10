namespace Backend.Api.Contracts;

public class ResponseContract
{
    public InterestPointsContract InterestPoints { get; set; } = default!;

    public PlanningContract Planning { get; set; } = default!;

    public Travel Travel { get; set; } = default!;
}
