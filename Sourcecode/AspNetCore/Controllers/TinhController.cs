using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Application.Domain.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AspNetCore.Controllers
{
    [Produces("application/json")]
    [Route("api/Tinh")]
    public class TinhController : Controller
    {
        private ILogger<TinhService> logger;
        private ApplicationContext context;
        private ITinhService tinhService;

        public TinhController(ILogger<TinhService> logger, DbContext context)
        {
            this.logger = logger;
        }

        [HttpPost]
        [Route("")]
        public IActionResult save([FromBody] Tinh model)
        {
            return Ok(model);
        }

        [HttpGet]
        [Route("")]
        public IActionResult search()
        {
            return Ok(1);
        }
    }
}