using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class ChucVuService : BaseService<ChucVu, PupilContext>, IChucVuService
    {
        public ChucVuService(ILogger<ChucVuService> logger) : base(logger)
        {
        }
    }
}

