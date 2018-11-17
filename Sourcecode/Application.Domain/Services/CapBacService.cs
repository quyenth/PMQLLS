using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class CapBacService : BaseService<CapBac, PupilContext>, ICapBacService
    {
        public CapBacService(ILogger<CapBacService> logger) : base(logger)
        {
        }
    }
}

