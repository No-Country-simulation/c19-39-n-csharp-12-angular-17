using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AgendApp.Models;

public partial class Horario
{
    public int IdHorario { get; set; }

    public string? Rango { get; set; }
    [JsonIgnore]
    public virtual ICollection<Medico> Medicos { get; set; } = new List<Medico>();
}
