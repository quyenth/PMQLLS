using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class RoleInfoService : BaseService<RoleInfo, PupilContext>, IRoleInfoService
    {
        public RoleInfoService(ILogger<RoleInfoService> logger) : base(logger)
        {
        }
    }
}

