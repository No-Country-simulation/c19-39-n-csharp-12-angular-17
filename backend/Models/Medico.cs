using System;
using System.Collections.Generic;

namespace AgendApp.Models;

public partial class Medico
{
    public int IdMedico { get; set; }

    public int? IdUsuario { get; set; }

    public int? IdCategoria { get; set; }

    public int? IdHorario { get; set; }

    public virtual ICollection<Cita> Cita { get; set; } = new List<Cita>();

    public virtual Categoriasmedica? IdCategoriaNavigation { get; set; }

    public virtual Horario? IdHorarioNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
