using System;
using System.Collections.Generic;

namespace AgendApp.Models;

public partial class Administradore
{
    public int IdAdministrador { get; set; }

    public int? IdUsuario { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
