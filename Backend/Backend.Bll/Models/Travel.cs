namespace Backend.Bll.Models;

public class Travel
{
    public List<Trip> Trips { get; set; } = default!;

    public string Advice { get; set; } = default!;
}
