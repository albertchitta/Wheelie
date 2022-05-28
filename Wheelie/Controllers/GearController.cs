using Microsoft.AspNetCore.Mvc;
using Wheelie.Repositories;
using Wheelie.Models;
using Microsoft.AspNetCore.Authorization;

namespace Wheelie.Controllers
{
    [Route("gear")]
    [ApiController]
    public class GearController : ControllerBase
    {
        private readonly IGearRepository _gearRepo;

        public GearController(IGearRepository gearRepository)
        {
            _gearRepo = gearRepository;
        }
        // POST api/gear
        [HttpPost]
        public IActionResult Post(Gear gear)
        {
            _gearRepo.AddGear(gear);

            return Ok(gear);
        }

        // GET: api/gear/{id}
        [HttpGet("{id}")]
        public IActionResult GetGearById(int id)
        {
            var gear = _gearRepo.GetGearById(id);
            if (gear == null)
            {
                return NotFound();
            }

            return Ok(gear);
        }

        // DELETE api/gear/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var gear = _gearRepo.GetGearById(id);
            if (gear == null)
            {
                return NotFound();
            }
            else
            {
                _gearRepo.DeleteGear(gear.Id);

                return NoContent();
            }
        }
    }
}
