using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class AccessHistoryService : BaseService<AccessHistory, PupilContext>, IAccessHistoryService
    {
        public AccessHistoryService(ILogger<AccessHistoryService> logger) : base(logger)
        {
        }
    }
}

