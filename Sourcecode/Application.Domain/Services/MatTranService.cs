using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class MatTranService : BaseService<MatTran, PupilContext>, IMatTranService
    {
        public MatTranService(ILogger<MatTranService> logger) : base(logger)
        {
        }
    }
}

