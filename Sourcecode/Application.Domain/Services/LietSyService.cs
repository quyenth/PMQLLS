using System;
using System.Collections.Generic;
using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class LietSyService : BaseService<LietSy, PupilContext>, ILietSyService
    {
        public LietSyService(ILogger<LietSyService> logger) : base(logger)
        {
        }
    }
}

