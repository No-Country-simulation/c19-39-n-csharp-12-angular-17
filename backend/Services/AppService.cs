using AgendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Services
{
    public interface IAppService
    {
        Task<Object> getAppointments();
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
    }
}
