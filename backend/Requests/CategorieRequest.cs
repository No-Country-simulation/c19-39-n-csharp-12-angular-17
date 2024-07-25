using System.ComponentModel.DataAnnotations;

namespace AgendApp.Requests
{
    public class CategorieRequest
    {
        [Required]
        public string? nombre { get; set; }
    }
}
