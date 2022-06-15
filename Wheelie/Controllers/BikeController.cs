using Microsoft.AspNetCore.Mvc;
using Wheelie.Repositories;
using Wheelie.Models;
using Microsoft.AspNetCore.Authorization;

namespace Wheelie.Controllers
{
    [Route("bikes")]
    [ApiController]
    public class BikeController : ControllerBase
    {
        private readonly IBikeRepository _bikeRepo;

        public BikeController(IBikeRepository bikeRepository)
        {
            _bikeRepo = bikeRepository;
        }

        // GET: bikes
        [HttpGet]
        public List<Bike> Get()
        {
            return _bikeRepo.GetAllBikes();
        }

        // GET: bikes/biker{id}
        [HttpGet("biker{id}")]
        public List<Bike> GetBikesByBikerId(int id)
        {
            return _bikeRepo.GetBikesByBikerId(id);
        }

        // GET: bikes/{id}
        [HttpGet("{id}")]
        public IActionResult GetBikeById(int id)
        {
            var bike = _bikeRepo.GetBikeById(id);
            if (bike == null)
            {
                return NotFound();
            }

            return Ok(bike);
        }

        // POST /bike
        [HttpPost]
        public IActionResult Post(Bike bike)
        {
            _bikeRepo.AddBike(bike);

            return Ok(bike);
        }

        // PATCH bikes/{id}
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, Bike bike)
        {
            if (id != bike.Id)
            {
                return BadRequest();
            }

            var existingBike = _bikeRepo.GetBikeById(id);
            if (existingBike == null)
            {
                return NotFound();
            }
            else
            {
                _bikeRepo.UpdateBike(bike);

                return NoContent();
            }
        }

        // DELETE bikes/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var bike = _bikeRepo.GetBikeById(id);
            if (bike == null)
            {
                return NotFound();
            }
            else
            {
                _bikeRepo.DeleteBike(bike.Id);

                return NoContent();
            }
        }
    }
}
