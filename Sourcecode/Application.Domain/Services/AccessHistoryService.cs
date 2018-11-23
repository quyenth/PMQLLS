using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class AccessHistoryService : BaseService<AccessHistory, ApplicationContext>, IAccessHistoryService
    {
        public AccessHistoryService(ILogger<AccessHistoryService> logger, ApplicationContext context) : base(logger,context)
        {
        }
    }
}

