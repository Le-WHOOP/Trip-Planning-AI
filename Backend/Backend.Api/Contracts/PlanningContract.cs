namespace Backend.Api.Contracts;

public class PlanningContract
{
    public List<CityPlanningContract> CityPlannings { get; set; } = default!;

    public string Advice { get; set; } = default!;
}
