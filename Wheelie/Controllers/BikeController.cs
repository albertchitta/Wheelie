﻿using Microsoft.AspNetCore.Mvc;
using Wheelie.Repositories;
using Wheelie.Models;
using Microsoft.AspNetCore.Authorization;

namespace Wheelie.Controllers
{
    public class BikeController : Controller
    {
        // GET: BikeController
        public ActionResult Index()
        {
            return View();
        }

        // GET: BikeController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: BikeController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BikeController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BikeController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: BikeController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BikeController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: BikeController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
