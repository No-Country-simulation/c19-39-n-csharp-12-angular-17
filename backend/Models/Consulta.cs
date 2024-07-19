using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AgendApp.Models;

public partial class Consulta
{
    public int IdConsulta { get; set; }

    public int? IdCita { get; set; }

    public string? Diagnostico { get; set; }
    [JsonIgnore]
    public virtual Cita? IdCitaNavigation { get; set; }
}
