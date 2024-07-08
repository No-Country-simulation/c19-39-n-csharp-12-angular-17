using System;
using System.Collections.Generic;

namespace AgendApp.Models;

public partial class Paciente
{
    public int IdPaciente { get; set; }

    public int? IdUsuario { get; set; }

    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
