using AgendApp.Requests;
using AgendApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private IRegisterService _registerService;

        public RegisterController(IRegisterService registerService)
        {
            this._registerService = registerService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("usuario")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterRequest request)
        {
            var result = _registerService.RegisterUser(request);
            return Ok(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("medico")]
        public async Task<IActionResult> RegisterMed([FromBody] MedRegisterRequest request)
        {
            var result = _registerService.RegisterMed(request);

            return Ok(result);
        }
    }
}
