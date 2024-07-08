using System.ComponentModel.DataAnnotations;

namespace AgendApp.Requests
{
    public class AuthRequest
    {
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
    }
}
