namespace Backend.Bll.Models;

public class Response
{
    public InterestPoints InterestPoints { get; set; } = default!;

    public Planning Planning { get; set; } = default!;

    public Travel Travel { get; set; } = default!;
}
