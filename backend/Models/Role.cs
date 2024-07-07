using System;
using System.Collections.Generic;

namespace AgendApp.Models;

public partial class Role
{
    public int IdRol { get; set; }

    public string? Nombre { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
