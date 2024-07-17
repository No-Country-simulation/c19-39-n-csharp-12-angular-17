using AgendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Services
{
    public interface IUserService
    {
        Task<Object> getUsers();
        Task<Object> getRoles();
    }
    public class UserService : IUserService
    {
        private AgendappDbContext _Db;

        public UserService(AgendappDbContext context)
        {
            _Db = context;
        }
   
        public async Task<Object> getUsers()
        {
            try
            {
                List<Usuario> users = await _Db.Usuarios.ToListAsync();
                return new
                {
                    status = 200,
                    success = true,
                    data = users
                };

            } catch (Exception ex) {
                return new
                {
                    status = 500,
                    success = false,
                    message = ex.InnerException?.Message ?? ex.Message
                };
            }

        }

        public async Task<Object> getRoles()
        {
            try
            {
                List<Role> roles = await _Db.Roles.ToListAsync<Role>();

                return new
                {
                    status = 200,
                    success = true,
                    data = roles
                };

            }
            catch (Exception ex)
            {
                return new
                {
                    status = 500,
                    success = false,
                    messaeg = ex.InnerException?.Message ?? ex.Message
                };
            }
        }
    }
}
