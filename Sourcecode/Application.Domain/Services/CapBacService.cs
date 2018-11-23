using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class CapBacService : BaseService<CapBac, ApplicationContext>, ICapBacService
    {
        public CapBacService(ILogger<CapBacService> logger, ApplicationContext context) : base(logger,context)
        {
        }
    }
}

