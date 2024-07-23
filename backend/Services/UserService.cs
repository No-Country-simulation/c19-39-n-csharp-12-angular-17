using AgendApp.Models;
using AgendApp.Requests;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Services
{
    public interface IUserService
    {
        Task<Object> getUsers();
        Task<Object> getUser(int id);
        Task<Object> getRoles();

        Task<Object> setCita(CitaRequest request);
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
                List<Usuario> users = await _Db.Usuarios.Where(u => u.IdRol == 1).ToListAsync();

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

        public async Task<Object> getUser(int id)
        {
            try
            {
                Usuario? usuario = await _Db.Usuarios.FirstOrDefaultAsync(u => u.IdUsuario == id);

                if (usuario == null)
                {
                    return new
                    {
                        status = 400,
                        success = false,
                        message = "Usuario no existe"
                    };
                }

                Medico? medico = await _Db.Medicos.FirstOrDefaultAsync(m => m.IdUsuario == usuario.IdUsuario);

                if(medico == null)
                {
                    return new
                    {
                        status = 200,
                        success = true,
                        data = usuario
                    };
                }

                return new
                {
                    status = 200,
                    success = true,
                    data = medico
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

        public async Task<Object> setCita(CitaRequest request)
        {
            try
            {
                Paciente? paciente = await _Db.Pacientes.FirstOrDefaultAsync(p => p.IdUsuario == request.idUsuario);

                if (paciente == null)
                {
                    Paciente newPaciente = new Paciente
                    {
                        IdUsuario = request.idUsuario
                    };

                    paciente = _Db.Pacientes.Add(newPaciente).Entity;
                    await _Db.SaveChangesAsync();
                }


                Cita newCita = new Cita
                {
                    IdPaciente = paciente.IdPaciente,
                    IdMedico = request.idMedico,
                    Hora = request.hora,
                    Fecha = DateOnly.Parse(request.fecha),
                    MotivoConsulta = request.motivoConsulta
                };

                Cita cita = _Db.Citas.Add(newCita).Entity;

                await _Db.SaveChangesAsync();

                return new
                {
                    status = 200,
                    success = true,
                    data = new
                    {
                        cita.IdCita,
                        cita.IdPaciente,
                        cita.IdMedico,
                        cita.Hora,
                        cita.Fecha,
                        cita.MotivoConsulta
                    }
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
