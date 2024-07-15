using AgendApp.Models;

namespace AgendApp.Services
{
    public interface IUserService
    {
        Object getUsers();
        Object getRoles();
    }
    public class UserService : IUserService
    {
        private AgendappDbContext _Db;

        public UserService(AgendappDbContext context)
        {
            _Db = context;
        }
   
        public Object getUsers()
        {
            try
            {
                List<Usuario> users = _Db.Usuarios.ToList();
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
                    message = ex.Message
                };
            }

        }

        public Object getRoles()
        {
            try
            {
                List<Role> roles = _Db.Roles.ToList<Role>();

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
                    messaeg = ex.Message
                };
            }
        }
    }
}
