using Application.Domain.Entity;
using Framework.Common;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class ThoiKyService : BaseService<ThoiKy, PupilContext>, IThoiKyService
    {
        public ThoiKyService(ILogger<ThoiKyService> logger) : base(logger)
        {
        }
    }
}

