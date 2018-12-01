using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace Application.Domain.Services
{
    public class MatTranService : BaseService<MatTran, ApplicationContext>, IMatTranService
    {
        public MatTranService(ILogger<MatTranService> logger, ApplicationContext context) : base(logger,context)
        {
        }

       

        public bool CheckCodeIsUnique(int id, string ma)
        {
            var result = this.dc.MatTran.Where(c => c.Id != id && c.Ma == ma).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }
    }
}

