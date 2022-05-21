using System.ComponentModel.DataAnnotations;

namespace Wheelie.Models
{
    public class Biker
    {
        public int Id { get; set; }

        [Required]
        public string FirebaseUserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Level { get; set; }
        public string Location { get; set; }
        public string ImageUrl { get; set; }
        public double Rides { get; set; }
        public double Distance { get; set; }
        public int GearId { get; set; }
        public int TrailId { get; set; }
    }
}
