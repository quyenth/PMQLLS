using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class MatTranService : BaseService<MatTran, ApplicationContext>, IMatTranService
    {
        public MatTranService(ILogger<MatTranService> logger, ApplicationContext context) : base(logger,context)
        {
        }
    }
}

