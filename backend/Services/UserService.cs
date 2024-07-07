using AgendApp.Models;

namespace AgendApp.Services
{
    public interface IUserService
    {
        Object GetUsers();
    }
    public class UserService : IUserService
    {
        private AgendappDbContext _Db;

        public UserService(AgendappDbContext context)
        {
            _Db = context;
        }
   
        public Object GetUsers()
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
    }
}
