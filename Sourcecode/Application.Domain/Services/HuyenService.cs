using System;
using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class HuyenService : BaseService<Huyen, PupilContext>, IHuyenService
    {
        public HuyenService(ILogger<HuyenService> logger) : base(logger)
        {
        }
    }
}

