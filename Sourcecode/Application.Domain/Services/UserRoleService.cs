using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class UserRoleService : BaseService<UserRole, ApplicationContext>, IUserRoleService
    {
        public UserRoleService(ILogger<UserRoleService> logger) : base(logger)
        {
        }
    }
}

