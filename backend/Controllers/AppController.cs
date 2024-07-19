using AgendApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppController : ControllerBase
    {
        private IAppService _appService;

        public AppController(IAppService appService)
        {
            this._appService = appService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("citas")]
        public async Task<IActionResult> getAppointments()
        {
            var resp = await _appService.getAppointments();

            return Ok(resp);
        }
    }
}
