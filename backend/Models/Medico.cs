using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace AgendApp.Models;

public partial class Medico
{
    public int IdMedico { get; set; }

    public int? IdUsuario { get; set; }

    public int? IdCategoria { get; set; }

    public int? IdHorario { get; set; }
    [JsonIgnore]
    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();
    [JsonIgnore]
    public virtual Categoriasmedica? IdCategoriaNavigation { get; set; }
    [JsonIgnore]
    public virtual Horario? IdHorarioNavigation { get; set; }
    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
