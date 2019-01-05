using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections;

namespace Application.Domain.Services
{
    public class DonViService : BaseService<DonVi, ApplicationContext>, IDonViService
    {
        public DonViService(ILogger<DonViService> logger, ApplicationContext context) : base(logger,context)
        {
        }

        public IList getListAllDonVI()
        {
            return this.dc.DonVi.ToList();
        }
    }
}

