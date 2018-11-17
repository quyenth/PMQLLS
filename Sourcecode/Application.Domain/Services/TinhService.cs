using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class TinhService : BaseService<Tinh, PupilContext>, ITinhService
    {
        public TinhService(ILogger<TinhService> logger) : base(logger)
        {
        }
    }
}

