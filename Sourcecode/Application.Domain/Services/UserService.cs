using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class UserService : BaseService<User, ApplicationContext>, IUserService
    {
        public UserService(ILogger<UserService> logger) : base(logger)
        {
        }
    }
}

