using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AgendApp.Models;

public partial class Cita
{
    public int IdCita { get; set; }

    public DateOnly? Fecha { get; set; }

    public string? Hora { get; set; }

    public int? IdPaciente { get; set; }

    public int? IdMedico { get; set; }

    public string? MotivoConsulta { get; set; }
    [JsonIgnore]
    public virtual ICollection<Consulta> Consulta { get; set; } = new List<Consulta>();
    public virtual Medico? IdMedicoNavigation { get; set; }
    public virtual Paciente? IdPacienteNavigation { get; set; }
}
