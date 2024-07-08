using System;
using System.Collections.Generic;

namespace AgendApp.Models;

public partial class Cita
{
    public int IdCita { get; set; }

    public DateOnly? Fecha { get; set; }

    public TimeOnly? Hora { get; set; }

    public int? IdPaciente { get; set; }

    public int? IdMedico { get; set; }

    public string? MotivoConsulta { get; set; }

    public virtual ICollection<Consulta> Consulta { get; set; } = new List<Consulta>();

    public virtual Medico? IdMedicoNavigation { get; set; }

    public virtual Paciente? IdPacienteNavigation { get; set; }
}
