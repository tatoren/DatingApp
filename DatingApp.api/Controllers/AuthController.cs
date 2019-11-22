using System.Threading.Tasks;
using DatingApp.api.Data;
using DatingApp.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(string username, string password)
        {
            //todo: Validate request

            username = username.ToLower();

            if(await _repo.UserExists(username)){
                return BadRequest("Username already exisits");
            }
            var userToCreate = new User {
                Username = username
            };
            var createdUser = await _repo.Register(userToCreate, password);

            return StatusCode(201);
        }

    }
}