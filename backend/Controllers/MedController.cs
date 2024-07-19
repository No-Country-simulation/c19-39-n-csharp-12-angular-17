using AgendApp.Requests;
using AgendApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedController : ControllerBase
    {
        private IMedService _medService;

        public MedController(IMedService medService)
        {
            this._medService = medService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("categoria/{id}")]
        public async Task<IActionResult> GetCategorie(int id)
        {
            var result = await _medService.getCategorie(id);
            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("categorias")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _medService.getCategories();

            return Ok(result);
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("horario")]
        public async Task<IActionResult> SetSchedule([FromBody] ScheduleRequest request)
        {
            var result = await _medService.setSchedule(request);
            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("horario/{id}")]
        public async Task<IActionResult> GetSchedule(int id)
        {
            var result = await _medService.getSchedule(id);

            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("horarios")]
        public async Task<IActionResult> GetSchedules()
        {
            var result = await _medService.getSchedules();


            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("medicos")]
        public async Task<IActionResult> GetMedicos()
        {
            var result = await _medService.getMedicos();

            return Ok(result);
        }
    }
}
