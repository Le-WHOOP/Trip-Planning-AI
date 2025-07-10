namespace Backend.Api.Contracts;
public class InterestPointsContract
{
    public List<AttractionContract> Attractions { get; set; } = default!;

    public string Advice { get; set; } = default!;
}
