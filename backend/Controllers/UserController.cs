using AgendApp.Requests;
using AgendApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("usuarios")]
        public async Task<IActionResult> GetUsers() {

            var resp = await _userService.getUsers();

            return Ok(resp);

        }

        [HttpGet]
        [AllowAnonymous]
        [Route("usuario/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var result = await _userService.getUser(id);

            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("roles")]
        public async Task<IActionResult> GetRoles()
        {
            var result = await _userService.getRoles();

            return Ok(result);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("citas/{idUser}")]
        public async Task<IActionResult> GetCitas(int idUser)
        {
            var result = await _userService.getCitas(idUser);

            return Ok(result);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("cita")]
        public async Task<IActionResult> SetCita(CitaRequest request)
        {
            var resp = await _userService.setCita(request);

            return Ok(resp);
        }

    }
}