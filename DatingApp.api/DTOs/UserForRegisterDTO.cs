using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.api.DTOs
{
    public class UserForRegisterDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]        
        public string City { get; set; }

        [Required]  
        public string Country { get; set; }

       
        public DateTime Created { get; set; }

   
        public DateTime LastLoggedIn { get; set; }

        [Required]
        [StringLength(12, MinimumLength = 8, ErrorMessage = "Password must be between 8 and 12 characters long")]
        public string Password { get; set; }

        public UserForRegisterDTO()
        {
            Created = DateTime.Now;
            LastLoggedIn = DateTime.Now;

        }
    }
}