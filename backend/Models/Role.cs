using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace AgendApp.Models;

public partial class Role
{
    public int IdRol { get; set; }

    public string? Nombre { get; set; }
    [JsonIgnore]
    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
