using AgendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Services
{
    public interface IAppService
    {
        Task<Object> getAppointments();

        Task<Object> getAppointment(int id);
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
                List<Cita> citas = await _db.Citas
                    .Include(i => i.IdPacienteNavigation.IdUsuarioNavigation)
                    .Include(i => i.IdMedicoNavigation.IdUsuarioNavigation)
                    .ToListAsync();

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
    }
}
