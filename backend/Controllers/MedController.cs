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

        [HttpPost]
        [AllowAnonymous]
        [Route("categoria")]
        public async Task<IActionResult> PostCategorie(CategorieRequest request)
        {
            var result = await _medService.postCategorie(request);

            return Ok(result);
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
        [Route("medico/{id}")]
        public async Task<IActionResult> GetMedico(int id)
        {
            var result = await _medService.getMedico(id);

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

        [HttpGet]
        [AllowAnonymous]
        [Route("citas/{idMed}")]
        public async Task<IActionResult> GetCitas(int idMed)
        {
            var result = await _medService.getCitas(idMed);

            return Ok(result);
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("horario/{id}")]
        public async Task<IActionResult> editSchedule(int id, ScheduleEditRequest request)
        {
            var result = _medService.editSchedule(id, request);
            return Ok(result);
        }

        [HttpPut]
        [AllowAnonymous]
        [Route("categoria/{id}")]
        public async Task<IActionResult> editCategorie(int id, CategorieEditRequest request)
        {
            var result = _medService.editCategorie(id, request);
            return Ok(result);
        }
    }
}
