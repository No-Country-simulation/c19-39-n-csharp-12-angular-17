using System;
using System.Collections.Generic;

namespace AgendApp.Models;

public partial class Horario
{
    public int IdHorario { get; set; }

    public string? Rango { get; set; }

    public virtual ICollection<Medico> Medicos { get; set; } = new List<Medico>();
}
