using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotnetCore.Common
{
    public class LogingMiddleWare
    {
        public ILogger<LogingMiddleWare> logger;
        private readonly RequestDelegate next;
        public LogingMiddleWare(
            RequestDelegate next,
            ILogger<LogingMiddleWare> logger
            )
        {
            this.next = next;
            this.logger =  logger;
        }

        public async Task Invoke(HttpContext context)
        {
            this.logger.LogInformation(101, "Inoke executing");
            await next.Invoke(context);
            this.logger.LogInformation(201, "Inoke executed");
        }
    }
}
