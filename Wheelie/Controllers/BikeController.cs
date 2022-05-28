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
        // GET: api/bikes
        [HttpGet]
        public List<Bike> Get()
        {
            return _bikeRepo.GetAllBikes();
        }

        // GET: api/bikes/{id}
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

        // POST api/bike
        [HttpPost]
        public IActionResult Post(Bike bike)
        {
            _bikeRepo.AddBike(bike);

            return Ok(bike);
        }

        // PATCH api/bikes/{id}
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

        // DELETE api/bikes/{id}
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
