using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AgendApp.Models;

public partial class Paciente
{
    public int IdPaciente { get; set; }

    public int? IdUsuario { get; set; }
    [JsonIgnore]
    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();
    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
