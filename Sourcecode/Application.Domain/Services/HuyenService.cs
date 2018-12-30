using System;
using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections;

namespace Application.Domain.Services
{
    public class HuyenService : BaseService<Huyen, ApplicationContext>, IHuyenService
    {
        public HuyenService(ILogger<HuyenService> logger, ApplicationContext context) : base(logger,context)
        {
        }

        public bool CheckCodeIsUnique(int huyenId, string maHuyen)
        {
            var result = this.dc.Huyen.Where(c => c.HuyenId != huyenId && c.MaHuyen == maHuyen).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        public bool CheckNameIsUnique(int huyenId, string tenHuyen)
        {
            var result = this.dc.Huyen.Where(c => c.HuyenId != huyenId && c.MaHuyen == tenHuyen).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// getListAllHuyen
        /// </summary>
        /// <returns></returns>
        public IList getListAllHuyen()
        {
            return this.dc.Huyen.ToList();
        }
    }
}

