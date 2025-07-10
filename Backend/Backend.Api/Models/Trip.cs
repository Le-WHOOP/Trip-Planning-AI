namespace Backend.Api.Models
{
    public class Trip
    {
        public string FromCity { get; set; }
        public string ToCity { get; set; }
        public string TransportationType { get; set; }
        public string TravelTime { get; set; }
        public string Price { get; set; }
        public string Website { get; set; }
    }
}
