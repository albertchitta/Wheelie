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

        // GET: BikerController
        [HttpGet]
        public List<Biker> Get()
        {
            return _bikerRepo.GetAllBikers();
        }

        //// GET: BikerController/Details/5
        //public ActionResult Details(int id)
        //{
        //    return View();
        //}

        //// GET: BikerController/Create
        //public ActionResult Create()
        //{
        //    return View();
        //}

        //// POST: BikerController/Create
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: BikerController/Edit/5
        //public ActionResult Edit(int id)
        //{
        //    return View();
        //}

        //// POST: BikerController/Edit/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Edit(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        //// GET: BikerController/Delete/5
        //public ActionResult Delete(int id)
        //{
        //    return View();
        //}

        //// POST: BikerController/Delete/5
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Delete(int id, IFormCollection collection)
        //{
        //    try
        //    {
        //        return RedirectToAction(nameof(Index));
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}
    }
}
