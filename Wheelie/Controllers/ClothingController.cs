﻿using Microsoft.AspNetCore.Mvc;
using Wheelie.Repositories;
using Wheelie.Models;
using Microsoft.AspNetCore.Authorization;

namespace Wheelie.Controllers
{
    [Route("api/clothings")]
    [ApiController]
    public class ClothingController : ControllerBase
    {
        private readonly IClothingRepository _clothingRepo;

        public ClothingController(IClothingRepository clothingRepository)
        {
            _clothingRepo = clothingRepository;
        }
        // GET: api/clothings
        [HttpGet]
        public List<Clothing> Get()
        {
            return _clothingRepo.GetAllClothings();
        }

        // GET: api/clothings/{id}
        [HttpGet("{id}")]
        public IActionResult GetClothingById(int id)
        {
            var clothing = _clothingRepo.GetClothingById(id);
            if (clothing == null)
            {
                return NotFound();
            }

            return Ok(clothing);
        }

        // POST api/clothing
        [HttpPost]
        public IActionResult Post(Clothing clothing)
        {
            _clothingRepo.AddClothing(clothing);

            return Ok(clothing);
        }

        // PATCH api/clothings/{id}
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, Clothing clothing)
        {
            if (id != clothing.Id)
            {
                return BadRequest();
            }

            var existingClothing = _clothingRepo.GetClothingById(id);
            if (existingClothing == null)
            {
                return NotFound();
            }
            else
            {
                _clothingRepo.UpdateClothing(clothing);

                return NoContent();
            }
        }

        // DELETE api/clothings/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var clothing = _clothingRepo.GetClothingById(id);
            if (clothing == null)
            {
                return NotFound();
            }
            else
            {
                _clothingRepo.DeleteClothing(clothing.Id);

                return NoContent();
            }
        }
    }
}
