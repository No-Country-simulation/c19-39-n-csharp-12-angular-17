using AgendApp.Models;
using AgendApp.Requests;

namespace AgendApp.Services
{
    public interface IAuthService
    {
        Object AuthUser(AuthRequest request);
        Object AuthMedico(AuthRequest request);
    }
    public class AuthService : IAuthService
    {
        private AgendappDbContext _db;

        public AuthService(AgendappDbContext context)
        {
            this._db = context;
        }

        public Object AuthUser(AuthRequest request)
        {
            try
            {
 
                var user = _db.Usuarios.Where(usuario => usuario.Email == request.email &&
                usuario.Contrasenia == request.password && usuario.IdRol == 1).FirstOrDefault();

                if(user == null)
                {
                    return new
                    {
                        status = 400,
                        success = false,
                        message = "Datos invalidos, revise la informacion suministrada"
                    };
                }

                return new
                {
                    status = 200,
                    success = true,
                    data = user
                };

            } catch (Exception ex)
            {
                return new
                {
                    status = 500,
                    success = false,
                    message = ex.Message
                };
            }
        }

        public Object AuthMedico(AuthRequest request)
        {
            try
            {
                var med = _db.Usuarios.Where(usuario => usuario.Email == request.email && 
                usuario.Contrasenia == request.password && usuario.IdRol == 2).FirstOrDefault();

                if(med == null)
                {
                    return new
                    {
                        status = 400,
                        success = false,
                        message = "Datos invalidos, revise la informacion suministrada"
                    };
                }

                return new
                {
                    status = 200,
                    success = true,
                    data = med
                };

            }
            catch (Exception ex)
            {
                return new
                {
                    status = 500,
                    success = false,
                    message = ex.Message
                };
            }
        }
    }
}
