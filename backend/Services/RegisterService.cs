using AgendApp.Models;
using AgendApp.Requests;

namespace AgendApp.Services
{
    public interface IRegisterService
    {
        Object RegisterMed(MedRegisterRequest request);
        Object RegisterUser(UserRegisterRequest request);
    }
    public class RegisterService : IRegisterService
    {
        private AgendappDbContext _db;
        public RegisterService(AgendappDbContext context) { 
            this._db = context;
        }

        public Object RegisterMed(MedRegisterRequest request)
        {
            try
            {
                Usuario newUser = new Usuario
                {
                    Dni = request.dni,
                    Nombre = request.nombre,
                    Apellido = request.apellido,
                    Email = request.email,
                    Telefono = request.telefono,
                    Contrasenia = request.password,
                    IdRol = 2
                };

                var addUser = _db.Usuarios.Add(newUser);
                var registeredUser = addUser.Entity;
               

                Medico newMed = new Medico {
                    IdUsuario = registeredUser.IdUsuario,
                    IdCategoria = request.idCategoria,
                    IdHorario = request.idHorario,
                };

                var addMed = _db.Medicos.Add(newMed);

                _db.SaveChanges();
                   
                return new {
                    status = 200,
                    success = true,
                    message = "Medico registrado exitosamente"
                };
                    
            }
            catch (Exception ex)
            {
                return new
                {
                    status = 500,
                    success = false,
                    message = ex.Message,
                };
            }
        }

        public Object RegisterUser(UserRegisterRequest request)
        {
            try
            {

                Usuario newUser = new Usuario
                {
                    Dni = request.dni,
                    Nombre = request.nombre,
                    Apellido = request.apellido,
                    Email = request.email,
                    Telefono = request.telefono,
                    Contrasenia = request.password,
                    IdRol = 1
                };

                var addUser = _db.Usuarios.Add(newUser);
                var user = addUser.Entity;

                _db.SaveChanges();

                return new
                {
                    status = 200,
                    success = true,
                    data = user
                };

            }catch(Exception ex)
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
