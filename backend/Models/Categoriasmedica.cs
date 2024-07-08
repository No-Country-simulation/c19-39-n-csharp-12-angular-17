using System;
using System.Collections.Generic;

namespace AgendApp.Models;

public partial class Categoriasmedica
{
    public int IdCategoria { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Medico> Medicos { get; set; } = new List<Medico>();
}
