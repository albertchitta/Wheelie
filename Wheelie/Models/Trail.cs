namespace Wheelie.Models
{
    public class Trail
    {
        public int Id { get; set; }
        public int BikerId { get; set; }
        public string ImageUrl { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public double Distance { get; set; }
        public int Grade { get; set; }
        public double Time {  get; set; }
    }
}
