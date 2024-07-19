using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AgendApp.Models;

public partial class Categoriasmedica
{
    public int IdCategoria { get; set; }

    public string? Nombre { get; set; }
    [JsonIgnore]
    public virtual ICollection<Medico> Medicos { get; set; } = new List<Medico>();
}
