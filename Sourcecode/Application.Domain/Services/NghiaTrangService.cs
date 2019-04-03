using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections;

namespace Application.Domain.Services
{
    public class NghiaTrangService : BaseService<NghiaTrang, ApplicationContext>, INghiaTrangService
    {
        public NghiaTrangService(ILogger<NghiaTrangService> logger, ApplicationContext context) : base(logger, context)
        {
        }

        public object getListNghiaTrang()
        {
            return this.dc.NghiaTrang.ToList();
        }
    }
}

