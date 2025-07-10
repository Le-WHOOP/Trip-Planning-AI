namespace Backend.Bll.Models;

public class CityPlanning
{
    public string City { get; set; } = default!;

    public DateOnly From { get; set; } = default!;

    public DateOnly To { get; set; } = default!;

    public string Description { get; set; } = default!;

    public Accommodation Accommodation { get; set; } = default!;
}
