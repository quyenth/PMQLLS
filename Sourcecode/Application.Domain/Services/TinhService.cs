using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;


namespace Application.Domain.Services
{
    public class TinhService : BaseService<Tinh, ApplicationContext>, ITinhService
    {
        public TinhService(ILogger<TinhService> logger, ApplicationContext context) : base(logger,context)
        {
        }

        public bool CheckCodeIsUnique(int tinhId, string maTinh)
        {
            var result = this.dc.Tinh.Where(c => c.TinhId != tinhId && c.MaTinh == maTinh).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        public bool CheckNameIsUnique(int tinhId, string tenTinh)
        {
            var result = this.dc.Tinh.Where(c => c.TinhId != tinhId && c.TenTinh == tenTinh).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }
    }
}

