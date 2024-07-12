﻿using AgendApp.Services;
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

            var resp = _userService.getUsers();

            return Ok(resp);

        }

        [HttpGet]
        [AllowAnonymous]
        [Route("roles")]
        public async Task<IActionResult> getRoles()
        {
            var result = _userService.getRoles();

            return Ok(result);
        }

    }
}