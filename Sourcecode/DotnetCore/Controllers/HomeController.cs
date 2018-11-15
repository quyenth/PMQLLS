using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DotnetCore.Controllers
{
    
    public class HomeController : ControllerBase
    {
        /// <summary>
        /// test
        /// </summary>
        /// <returns></returns>
        /// 
        [HttpGet]
        public IActionResult Index()
        {
            //throw new Exception();
            return NoContent();
        }
    }
}