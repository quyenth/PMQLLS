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
            var result = this.dc.Huyen.Where(c => c.HuyenId != huyenId && c.TenHuyen == tenHuyen).ToList();
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

        public IList getListHuyenByTinh(int tinhId)
        {
            return this.dc.Huyen.Where(c => c.TinhId == tinhId).ToList();
        }

        public IList getSearchListHuyen(string name, PagingInfo paging)
        {
            var result = (from a in this.dc.Huyen
                          join b in this.dc.Tinh on a.TinhId equals b.TinhId
                          where (name == null || a.TenHuyen.Contains(name))
                          select new
                          {
                              HuyenIdh = a.HuyenId,
                              Is1990 = a.Is1990,
                              MaHuyen = a.MaHuyen,
                              TenHuyen = a.TenHuyen,
                              TinhId = a.TinhId,
                              TinhName = b.TenTinh
                          }).OrderBy(c => c.TenHuyen)
                            .Skip(paging.PageSize * (paging.PageIndex - 1))
                            .Take(paging.PageSize).ToList();
            return result;
        }
    }
}

