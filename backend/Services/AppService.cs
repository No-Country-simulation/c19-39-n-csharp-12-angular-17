using AgendApp.Models;
using AgendApp.Requests;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Services
{
    public interface IAppService
    {
        Task<Object> getAppointments();

        Task<Object> getAppointment(int id);

        Object editAppointment(int id, CitaRequest request);
    }
    public class AppService : IAppService
    {
        private AgendappDbContext _db;
        public AppService(AgendappDbContext context)
        {
            this._db = context;
        }

        public async Task<Object> getAppointments()
        {
            try
            {
                List<Cita> citas = await _db.Citas.ToListAsync();

                return new
                {
                    status = 200,
                    success = true,
                    data = citas
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

        public async Task<Object> getAppointment(int id)
        {
            try
            {
                Cita? cita = await _db.Citas.FirstOrDefaultAsync(c => c.IdCita == id);

                if(cita == null)
                {
                    return new
                    {
                        status = 400,
                        success = false,
                        message = "Cita no existe"
                    };
                }

                return new
                {
                    status = 200,
                    success = true,
                    data = cita
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

        public Object editAppointment(int id, CitaRequest request)
        {
            try
            {
                Cita? cita = _db.Citas.FirstOrDefault(c => c.IdCita == id);

                if(cita == null)
                {
                    return new
                    {
                        status = 400,
                        success = false,
                        message = "Cita no existe"
                    };
                }

                Paciente? paciente = _db.Pacientes.FirstOrDefault(p => p.IdUsuario == request.idUsuario);

                cita.IdPaciente = paciente.IdPaciente;
                cita.IdMedico = request.idMedico;
                cita.Hora = request.hora;
                cita.Fecha = DateOnly.Parse(request.fecha);
                cita.MotivoConsulta = request.motivoConsulta;

                Cita? addedAppointment = _db.Citas.Update(cita).Entity;
                _db.SaveChanges();

                return new
                {
                    status = 200,
                    success = true,
                    data = addedAppointment
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
