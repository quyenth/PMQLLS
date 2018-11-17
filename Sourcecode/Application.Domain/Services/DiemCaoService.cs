using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class DiemCaoService : BaseService<DiemCao, ApplicationContext>, IDiemCaoService
    {
        public DiemCaoService(ILogger<DiemCaoService> logger) : base(logger)
        {
        }
    }
}

