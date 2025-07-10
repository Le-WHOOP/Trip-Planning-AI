namespace Backend.Bll.Models;

public class Request
{
    public string Country { get; set; } = default!;

    public DateOnly From { get; set; } = default!;

    public DateOnly To { get; set; } = default!;

    public string Wishes { get; set; } = default!;
}
