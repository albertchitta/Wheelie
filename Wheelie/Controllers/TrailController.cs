using Microsoft.AspNetCore.Mvc;
using Wheelie.Repositories;
using Wheelie.Models;
using Microsoft.AspNetCore.Authorization;

namespace Wheelie.Controllers
{
    [Route("api/trails")]
    [ApiController]
    public class TrailController : ControllerBase
    {
        private readonly ITrailRepository _trailRepo;

        public TrailController(ITrailRepository trailRepository)
        {
            _trailRepo = trailRepository;
        }

        // GET: api/trails
        [HttpGet]
        public List<Trail> Get()
        {
            return _trailRepo.GetAllTrails();
        }

        // GET: api/trail/{id}
        [HttpGet("{id}")]
        public IActionResult GetTrailById(int id)
        {
            var trail = _trailRepo.GetTrailById(id);
            if (trail == null)
            {
                return NotFound();
            }

            return Ok(trail);
        }

        // POST api/trail
        [HttpPost]
        public IActionResult Post(Trail trail)
        {
            _trailRepo.AddTrail(trail);

            return Ok(trail);
        }

        // PATCH api/trails/{id}
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, Trail trail)
        {
            if (id != trail.Id)
            {
                return BadRequest();
            }

            var existingTrail = _trailRepo.GetTrailById(id);
            if (existingTrail == null)
            {
                return NotFound();
            }
            else
            {
                _trailRepo.UpdateTrail(trail);

                return NoContent();
            }
        }

        // DELETE api/trails/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var trail = _trailRepo.GetTrailById(id);
            if (trail == null)
            {
                return NotFound();
            }
            else
            {
                _trailRepo.DeleteTrail(trail.Id);

                return NoContent();
            }
        }
    }
}
