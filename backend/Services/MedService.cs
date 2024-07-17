using AgendApp.Models;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Services
{
    public interface IMedService
    {
        Task<Object> getCategories();
        Task<Object> getSchedules();
    }
    public class MedService : IMedService
    {
        private AgendappDbContext _db;
        public MedService(AgendappDbContext context)
        {
            this._db = context;
        }

        public async Task<Object> getCategories()
        {
            try
            {

                List<Categoriasmedica> categories = await _db.Categoriasmedicas.ToListAsync<Categoriasmedica>();

                return new
                {
                    status = 200,
                    success = true,
                    data = categories
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

        public async Task<Object> getSchedules()
        {
            try
            {
                List<Horario> schedules = await _db.Horarios.ToListAsync<Horario>();

                return new
                {
                    status = 200,
                    success = true,
                    data = schedules
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
