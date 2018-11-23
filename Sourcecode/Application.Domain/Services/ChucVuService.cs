using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class ChucVuService : BaseService<ChucVu, ApplicationContext>, IChucVuService
    {
        public ChucVuService(ILogger<ChucVuService> logger, ApplicationContext context) : base(logger,context)
        {
        }
    }
}

