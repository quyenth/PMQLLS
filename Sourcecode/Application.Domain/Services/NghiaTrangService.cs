using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class NghiaTrangService : BaseService<NghiaTrang, ApplicationContext>, INghiaTrangService
    {
        public NghiaTrangService(ILogger<NghiaTrangService> logger, ApplicationContext context) : base(logger, context)
        {
        }
    }
}

