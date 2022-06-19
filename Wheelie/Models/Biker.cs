using System.ComponentModel.DataAnnotations;

namespace Wheelie.Models
{
    public class Biker
    {
        public int Id { get; set; }

        [Required]
        public string FirebaseUserId { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Level { get; set; }

        [Required]
        public string Location { get; set; }
        public string ImageUrl { get; set; }
    }
}
