using AgendApp.Models;
using AgendApp.Requests;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Services
{
    public interface IAuthService
    {
        Task<Object> AuthUser(AuthRequest request);
        Task<Object> AuthMedico(AuthRequest request);
    }
    public class AuthService : IAuthService
    {
        private AgendappDbContext _db;

        public AuthService(AgendappDbContext context)
        {
            this._db = context;
        }

        public async Task<Object> AuthUser(AuthRequest request)
        {
            try
            {

                var user = await _db.Usuarios.Where(usuario => usuario.Email == request.email &&
                usuario.Contrasenia == request.password && usuario.IdRol == 1).FirstOrDefaultAsync();

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
                    message = ex.InnerException?.Message ?? ex.Message
                };
            }
        }

        public async Task<Object> AuthMedico(AuthRequest request)
        {
            try
            {
                var med = await _db.Usuarios.Where(usuario => usuario.Email == request.email &&
                usuario.Contrasenia == request.password && usuario.IdRol == 2).FirstOrDefaultAsync();

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
                    message = ex.InnerException?.Message ?? ex.Message
                };
            }
        }
    }
}
