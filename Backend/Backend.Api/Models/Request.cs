namespace Backend.Api.Models
{
    public class Request
    {
        public string Country { get; set; }
        public DateOnly From { get; set; }
        public DateOnly To { get; set; }
        public string Wishes { get; set; }
    }
}
