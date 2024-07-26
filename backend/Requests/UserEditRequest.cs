using System.ComponentModel.DataAnnotations;

namespace AgendApp.Requests
{
    public class UserEditRequest
    {
        public string? dni { get; set; }

        public string? nombre { get; set; }

        public string? apellido { get; set; }

        public string? email { get; set; }

        public string? telefono { get; set; }

        public string? contrasenia { get; set; }

        public int? idRol { get; set; }
    }
}
