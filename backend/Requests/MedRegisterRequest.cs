using System.ComponentModel.DataAnnotations;

namespace AgendApp.Requests
{
    public class MedRegisterRequest
    {
        [Required]
        public string dni {  get; set; }
        [Required]
        public string nombre { get; set; }
        [Required]
        public string apellido { get; set; }
        [Required]
        public string email { get; set; }
        [Required]
        public string telefono { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public int idMedico { get; set; }
        [Required]
        public int idCategoria { get; set; }
        [Required]
        public int idHorario { get; set; }
    }
}
