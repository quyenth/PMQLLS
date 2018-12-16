using Application.Domain.Entity;
using Framework.Common;
using Microsoft.Extensions.Logging;
using System.Collections;
using System.Linq;

namespace Application.Domain.Services
{
    public class ThoiKyService : BaseService<ThoiKy, ApplicationContext>, IThoiKyService
    {
        public ThoiKyService(ILogger<ThoiKyService> logger, ApplicationContext context) : base(logger,context)
        {
        }

         public bool CheckNameIsUnique(int id, string name)
        {
            var result = this.dc.ThoiKy.Where(c => c.Id != id && c.Name == name).ToList();
            if(result.Count> 0)
            {
                return false;
            }

            return true;
        }

        public IList GetListAllThoiKy()
        {
            return this.dc.ThoiKy.ToList();
        }
    }
}

