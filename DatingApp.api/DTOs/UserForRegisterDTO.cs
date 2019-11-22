using System.ComponentModel.DataAnnotations;

namespace DatingApp.api.DTOs
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 12 characters long")]
        public string Password { get; set; }
    }
}