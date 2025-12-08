namespace backend.Models
{
    public class Car
    {
        public int id { get; set; }
        public string make { get; set; } = string.Empty;
        public string model { get; set; } = string.Empty;

        public string owner { get; set; } = string.Empty;
        public string regoExpiry { get; set; } = string.Empty;
    }
}