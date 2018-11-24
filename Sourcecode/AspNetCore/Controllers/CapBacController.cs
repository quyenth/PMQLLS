using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCore.Controllers
{
    [Produces("application/json")]
    [Route("api/CapBac")]
    public class CapBacController : Controller
    {       

        [HttpPost]
        [Route("")]
        public IActionResult save(CapBac model)
        {
            return Json(model);
        }
    }
}