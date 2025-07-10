namespace Backend.Bll.Models;

public class Request
{
    public string Country { get; set; } = default!;

    public DateTime From { get; set; } = default!;

    public DateTime To { get; set; } = default!;

    public string Wishes { get; set; } = default!;
}
