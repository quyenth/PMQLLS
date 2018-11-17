using System;
using System.Collections.Generic;
using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class DonViService : BaseService<DonVi, ApplicationContext>, IDonViService
    {
        public DonViService(ILogger<DonViService> logger) : base(logger)
        {
        }
    }
}

