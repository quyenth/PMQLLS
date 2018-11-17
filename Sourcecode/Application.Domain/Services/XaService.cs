using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class XaService : BaseService<Xa, ApplicationContext>, IXaService
    {
        public XaService(ILogger<XaService> logger) : base(logger)
        {
        }
    }
}

