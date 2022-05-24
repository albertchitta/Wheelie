using Microsoft.AspNetCore.Mvc;
using Wheelie.Repositories;
using Wheelie.Models;
using Microsoft.AspNetCore.Authorization;

namespace Wheelie.Controllers
{
    [Route("api/bikers")]
    [ApiController]
    public class BikerController : ControllerBase
    {
        private readonly IBikerRepository _bikerRepo;

        public BikerController(IBikerRepository bikerRepository)
        {
            _bikerRepo = bikerRepository;
        }

        // GET: api/bikers
        [HttpGet]
        public List<Biker> Get()
        {
            return _bikerRepo.GetAllBikers();
        }

        // GET: api/bikers/{firebaseUserId}
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var biker = _bikerRepo.GetByFirebaseUserId(firebaseUserId);
            if (biker == null)
            {
                return NotFound();
            }

            return Ok(biker);
        }

        [Authorize]
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var biker = _bikerRepo.GetByFirebaseUserId(firebaseUserId);
            if (biker == null)
            {
                return NotFound();
            }

            return Ok();
        }

        // POST api/biker
        [HttpPost]
        public IActionResult Post(Biker biker)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            biker.Role = "user";
            _bikerRepo.AddBiker(biker);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = biker.FirebaseUserId }, biker);
        }

        // PATCH api/bikers/{firebaseUserId}
        [HttpPatch("{firebaseUserId}")]
        public IActionResult Patch(string firebaseUserId, Biker biker)
        {
            if (firebaseUserId != biker.FirebaseUserId)
            {
                return BadRequest();
            }

            var existingBiker = _bikerRepo.GetByFirebaseUserId(firebaseUserId);
            if (existingBiker == null)
            {
                return NotFound();
            }
            else
            {
                _bikerRepo.UpdateBiker(biker);
                return NoContent();
            }
        }

        // DELETE api/bikers/{firebaseUserId}
        [HttpDelete("{firebaseUserId}")]
        public IActionResult Delete(string firebaseUserId)
        {
            var biker = _bikerRepo.GetByFirebaseUserId(firebaseUserId);
            if (biker == null)
            {
                return NotFound();
            }
            else
            {
                _bikerRepo.DeleteBiker(biker.FirebaseUserId);
                return NoContent();
            }
        }
    }
}
