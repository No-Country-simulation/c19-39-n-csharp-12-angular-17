using AgendApp.Models;
using AgendApp.Requests;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Services
{
    public interface IMedService
    {
        Task<Object> getCategorie(int id);
        Task<Object> getCategories();
        Task<Object> setSchedule(ScheduleRequest request);
        Task<Object> getSchedules();
        Task<Object> getSchedule(int id);
        Task<Object> getMedicos();

    }
    public class MedService : IMedService
    {
        private AgendappDbContext _db;
        public MedService(AgendappDbContext context)
        {
            this._db = context;
        }

        public async Task<Object> getCategorie(int id)
        {
            try
            {
                Categoriasmedica? categorie = await _db.Categoriasmedicas.FirstOrDefaultAsync(c => c.IdCategoria == id);

                if (categorie == null)
                {
                    return new
                    {
                        status = 400,
                        success = false,
                        message = "Categoria medica no existe"
                    };
                }

                return new
                {
                    status = 200,
                    success = true,
                    data = categorie
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

        public async Task<Object> setSchedule(ScheduleRequest request)
        {
            try
            {
                Horario newSchedule = new Horario
                {
                    Rango = request.rango
                };

                var schedule = await _db.Horarios.AddAsync(newSchedule);

                await _db.SaveChangesAsync();

                return new
                {
                    status = 200,
                    success = true,
                    data = schedule.Entity
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

        public async Task<Object> getMedicos()
        {
            try
            {


                List<Medico> medicos = await _db.Medicos.Include(i => i.IdUsuarioNavigation).ToListAsync();

                return new
                {
                    status = 200,
                    success = true,
                    data = medicos
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

        public async Task<Object> getSchedule(int id)
        {
            try
            {
                Horario? horario = await _db.Horarios.FirstOrDefaultAsync(h => h.IdHorario == id);

                if(horario == null)
                {
                    return new
                    {
                        status = 400,
                        success = false,
                        message = "Horario no existe"
                    };
                }

                return new
                {
                    status = 200,
                    success = true,
                    data = horario
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
