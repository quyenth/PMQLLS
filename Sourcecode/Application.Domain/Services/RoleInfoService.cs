using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class RoleInfoService : BaseService<RoleInfo, ApplicationContext>, IRoleInfoService
    {
        public RoleInfoService(ILogger<RoleInfoService> logger, ApplicationContext context) : base(logger,context)
        {
        }
    }
}

