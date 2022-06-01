using Microsoft.AspNetCore.Mvc;
using Wheelie.Repositories;
using Wheelie.Models;
using Microsoft.AspNetCore.Authorization;

namespace Wheelie.Controllers
{
    [Route("trails")]
    [ApiController]
    public class TrailController : ControllerBase
    {
        private readonly ITrailRepository _trailRepo;

        public TrailController(ITrailRepository trailRepository)
        {
            _trailRepo = trailRepository;
        }

        // GET: trails
        [HttpGet]
        public List<Trail> Get()
        {
            return _trailRepo.GetAllTrails();
        }

        // GET: trails/biker{id}
        [HttpGet("biker{id}")]
        public List<Trail> GetTrailsByBikerId(int id)
        {
            return _trailRepo.GetTrailsByBikerId(id);
        }

        // GET: trails/{id}
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

        // POST trails
        [HttpPost]
        public IActionResult Post(Trail trail)
        {
            _trailRepo.AddTrail(trail);

            return Ok(trail);
        }

        // PATCH trails/{id}
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

        // DELETE trails/{id}
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
