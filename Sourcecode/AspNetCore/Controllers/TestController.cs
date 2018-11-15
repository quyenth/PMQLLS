using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AspNetCore.Controllers
{
    [Produces("application/json")]
    
    public class TestController : Controller
    {
        /// <summary>
        /// test api
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/v1/default/Index")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public string Index()
        {
            return "ok";
        }

    }
}