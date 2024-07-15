using System;
using System.Collections.Generic;

namespace AgendApp.Models;

public partial class Consulta
{
    public int IdConsulta { get; set; }

    public int? IdCita { get; set; }

    public string? Diagnostico { get; set; }

    public virtual Cita? IdCitaNavigation { get; set; }
}
