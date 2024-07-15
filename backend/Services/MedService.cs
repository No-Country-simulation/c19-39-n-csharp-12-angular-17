using AgendApp.Models;

namespace AgendApp.Services
{
    public interface IMedService
    {
        Object getCategories();
        Object getSchedules();
    }
    public class MedService : IMedService
    {
        private AgendappDbContext _db;
        public MedService(AgendappDbContext context)
        {
            this._db = context;
        }

        public Object getCategories()
        {
            try
            {

                List<Categoriasmedica> categories = _db.Categoriasmedicas.ToList<Categoriasmedica>();

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
                    message = ex.Message
                };
            }
        }

        public Object getSchedules()
        {
            try
            {
                List<Horario> schedules = _db.Horarios.ToList<Horario>();

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
                    message = ex.Message
                };
            }
        }
    }
}
