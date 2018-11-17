using Application.Domain.Entity;
using Framework.Common;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class ThoiKyService : BaseService<ThoiKy, ApplicationContext>, IThoiKyService
    {
        public ThoiKyService(ILogger<ThoiKyService> logger) : base(logger)
        {
        }
    }
}

