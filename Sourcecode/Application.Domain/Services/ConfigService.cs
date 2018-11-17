using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;

namespace Application.Domain.Services
{
    public class ConfigService : BaseService<Config, PupilContext>, IConfigService
    {
        public ConfigService(ILogger<ConfigService> logger) : base(logger)
        {
        }
    }
}

