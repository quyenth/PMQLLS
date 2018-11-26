using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Linq;


namespace Application.Domain.Services
{
    public class CapBacService : BaseService<CapBac, ApplicationContext>, ICapBacService
    {
        public CapBacService(ILogger<CapBacService> logger, ApplicationContext context) : base(logger,context)
        {
        }
        

        public bool CheckNameIsUnique(int capBacId, string name)
        {
            var result = this.dc.CapBac.Where(c => c.CapBacId != capBacId && c.Text == name).ToList();
            if(result.Count> 0)
            {
                return false;
            }

            return true;
        }
    }
}

