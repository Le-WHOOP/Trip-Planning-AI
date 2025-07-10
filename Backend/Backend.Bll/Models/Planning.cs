namespace Backend.Bll.Models;

public class Planning
{
    public List<CityPlanning> CityPlannings { get; set; } = default!;

    public string Advice { get; set; } = default!;
}
