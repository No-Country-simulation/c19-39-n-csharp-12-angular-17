using AgendApp.Requests;
using AgendApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;
        public AuthController(IAuthService authService) {
            this._authService = authService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("usuario")]
        public async Task<IActionResult> AuthUser([FromBody] AuthRequest request)
        {
            var resp = await _authService.AuthUser(request);

            return Ok(resp);
        }

        //[HttpPost]
        //[AllowAnonymous]
        //[Route("medico")]
        //public async Task<IActionResult> AuthMedico([FromBody] AuthRequest request)
        //{
        //    var resp = await _authService.AuthMedico(request);

        //    return Ok(resp);
        //}

    }
}
