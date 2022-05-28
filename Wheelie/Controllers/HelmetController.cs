using Microsoft.AspNetCore.Mvc;
using Wheelie.Repositories;
using Wheelie.Models;
using Microsoft.AspNetCore.Authorization;

namespace Wheelie.Controllers
{
    [Route("helmets")]
    [ApiController]
    public class HelmetController : ControllerBase
    {
        private readonly IHelmetRepository _helmetRepo;

        public HelmetController(IHelmetRepository helmetRepository)
        {
            _helmetRepo = helmetRepository;
        }
        // GET: api/helmets
        [HttpGet]
        public List<Helmet> Get()
        {
            return _helmetRepo.GetAllHelmets();
        }

        // GET: api/helmets/{id}
        [HttpGet("{id}")]
        public IActionResult GetHelmetById(int id)
        {
            var helmet = _helmetRepo.GetHelmetById(id);
            if (helmet == null)
            {
                return NotFound();
            }

            return Ok(helmet);
        }

        // POST api/helmet
        [HttpPost]
        public IActionResult Post(Helmet helmet)
        {
            _helmetRepo.AddHelmet(helmet);

            return Ok(helmet);
        }

        // PATCH api/helmets/{id}
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, Helmet helmet)
        {
            if (id != helmet.Id)
            {
                return BadRequest();
            }

            var existingHelmet = _helmetRepo.GetHelmetById(id);
            if (existingHelmet == null)
            {
                return NotFound();
            }
            else
            {
                _helmetRepo.UpdateHelmet(helmet);

                return NoContent();
            }
        }

        // DELETE api/helmets/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var helmet = _helmetRepo.GetHelmetById(id);
            if (helmet == null)
            {
                return NotFound();
            }
            else
            {
                _helmetRepo.DeleteHelmet(helmet.Id);

                return NoContent();
            }
        }
    }
}
