namespace Backend.Api.Models
{
    public class CityPlanning
    {
        public string City { get; set; }
        public DateOnly From { get; set; }
        public DateOnly To { get; set; }
        public string Description { get; set; }
        public Accommodation Accommodation { get; set; }
    }
}
