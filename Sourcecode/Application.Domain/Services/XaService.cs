using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections;

namespace Application.Domain.Services
{
    public class XaService : BaseService<Xa, ApplicationContext>, IXaService
    {
        public XaService(ILogger<XaService> logger, ApplicationContext context) : base(logger,context)
        {
        }

        public bool CheckCodeIsUnique(int xaId, string maXa)
        {
            var result = this.dc.Xa.Where(c => c.XaId != xaId && c.MaXa == maXa).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        public bool CheckNameIsUnique(int xaId, string tenXa)
        {
            var result = this.dc.Xa.Where(c => c.XaId != xaId && c.TenXa == tenXa).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        public IList getListXaByHuyen(int huyenId)
        {
            return this.dc.Xa.Where(c => c.HuyenId == huyenId).ToList();
        }
    }
}

