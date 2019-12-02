using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.api.Data;
using DatingApp.api.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

           [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
         var users = await _repo.GetUsers();
     
         var usersToReturn = _mapper.Map<IEnumerable<UsersForListDTO>>(users);
     
         return Ok(usersToReturn);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _repo.GetUser(id);

        var userToReturn = _mapper.Map<UserForDetailedDTO>(user);
        return Ok(userToReturn);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserForUpdatesDTO userForUpdatesDTO ) 
    {
        if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
            return Unauthorized();
        }
        var userFromRepo = await _repo.GetUser(id);
        
        _mapper.Map(userForUpdatesDTO, userFromRepo);

        if (await _repo.SaveAll() ){
            return NoContent();
        }
        throw new Exception($"Updating user {id} failed on save.");
    } 


    }
}