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
        [Route("categorias")]
        public async Task<IActionResult> getCategories()
        {
            var result = await _medService.getCategories();

            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("horarios")]
        public async Task<IActionResult> getSchedules()
        {
            var result = await _medService.getSchedules();

            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("medicos")]
        public async Task<IActionResult> getMedicos()
        {
            var result = await _medService.getMedicos();

            return Ok(result);
        }
    }
}
