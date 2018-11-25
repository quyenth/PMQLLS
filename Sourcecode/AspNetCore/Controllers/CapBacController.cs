using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Application.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AspNetCore.Controllers
{
    [Route("api/CapBac")]
    public class CapBacController : ControllerBase
    {
        private ILogger<CapBacService> logger;
        private ApplicationContext context;
        private ICapBacService CapBacService;

        public CapBacController(ILogger<CapBacService> logger , DbContext context)
        {
            this.logger = logger;     
        }

        [HttpPost]
        [Route("")]
        public IActionResult save([FromBody] CapBac model)
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