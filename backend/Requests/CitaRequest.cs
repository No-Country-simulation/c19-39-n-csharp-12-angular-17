using System.ComponentModel.DataAnnotations;

namespace AgendApp.Requests
{
    public class CitaRequest
    {
        [Required]
        public int idUsuario { get; set; }
        [Required]
        public int idMedico { get; set; }
        [Required]
        public string? hora { get; set; }
        [Required]
        public string? fecha { get; set; }
        [Required]
        public string? motivoConsulta { get; set; }

    }
}
