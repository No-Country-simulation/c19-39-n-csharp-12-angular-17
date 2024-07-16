using AgendApp.Models;
using AgendApp.Requests;

namespace AgendApp.Services
{
    public interface IRegisterService
    {
        Task<Object> RegisterMed(MedRegisterRequest request);
        Task<Object> RegisterUser(UserRegisterRequest request);
    }
    public class RegisterService : IRegisterService
    {
        private AgendappDbContext _db;
        public RegisterService(AgendappDbContext context) { 
            _db = context;
        }

        public async Task<Object> RegisterMed(MedRegisterRequest request)
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

                //var userExist = _db.Usuarios.FirstOrDefault(u => u.Dni == newUser.Dni || u.Email == newUser.Email);
                //if (userExist != null) return new { status = 400, success = false, message = "Email y/o Dni registrado"};

                var addUser = _db.Usuarios.Add(newUser);
                await _db.SaveChangesAsync();
                var registeredUser = addUser.Entity;
               
                Medico newMed = new Medico {
                    IdUsuario = registeredUser.IdUsuario,
                    IdCategoria = request.idCategoria,
                    IdHorario = request.idHorario,
                };

                var addMed = _db.Medicos.Add(newMed);
                var registeredMed = addMed.Entity;
                await _db.SaveChangesAsync();

                return new {
                    status = 200,
                    success = true,
                    data = new {
                        usuario = new {
                            registeredUser.IdUsuario,
                            registeredUser.Dni,
                            registeredUser.Nombre,
                            registeredUser.Apellido,
                            registeredUser.Telefono,
                            registeredUser.Email
                        },
                        medico = new {
                            registeredMed.IdMedico,
                            registeredMed.IdUsuario,
                            registeredMed.IdHorario,
                            registeredMed.IdCategoria
                        }
                    }
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

        public async Task<Object> RegisterUser(UserRegisterRequest request)
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

                var userExist = _db.Usuarios.FirstOrDefault(u => u.Dni == newUser.Dni || u.Email == newUser.Email);
                if (userExist != null) return new { status = 400, success = false, message = "Email y/o Dni registrado" };

                var addUser = _db.Usuarios.Add(newUser);
                var user = addUser.Entity;

                await _db.SaveChangesAsync();

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
                    message = ex.InnerException?.Message ?? ex.Message
                };
            }
        }
    }
}
