using System;
using System.Collections.Generic;
using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class DoiTuongService : BaseService<DoiTuong, PupilContext>, IDoiTuongService
    {
        public DoiTuongService(ILogger<DoiTuongService> logger) : base(logger)
        {
        }
    }
}

