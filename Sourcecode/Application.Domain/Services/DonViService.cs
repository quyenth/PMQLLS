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

        public bool CheckCodeIsUnique(int donViId, string maDonVi)
        {
            var result = this.dc.DonVi.Where(c => c.DonViId != donViId && c.MaDonVi == maDonVi).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        public bool CheckNameIsUnique(int donViId, string tenDonVi)
        {
            var result = this.dc.DonVi.Where(c => c.DonViId != donViId && c.TenDonVi == tenDonVi).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        public IList getListAllDonVI()
        {
            return this.dc.DonVi.ToList();
        }
    }
}

