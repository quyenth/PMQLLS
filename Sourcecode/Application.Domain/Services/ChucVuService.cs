using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace Application.Domain.Services
{
    public class ChucVuService : BaseService<ChucVu, ApplicationContext>, IChucVuService
    {
        public ChucVuService(ILogger<ChucVuService> logger, ApplicationContext context) : base(logger,context)
        {
        }

        /// <summary>
        /// CheckCodeIsUnique
        /// </summary>
        /// <param name="id"></param>
        /// <param name="code"></param>
        /// <returns>bool</returns>
        public bool CheckCodeIsUnique(int id, string code)
        {
            var result = this.dc.ChucVu.Where(c => c.ChucVuId != id && c.Code == code).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// CheckNameIsUnique
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <returns>bool</returns>
        public bool CheckNameIsUnique(int id, string name)
        {
            var result = this.dc.ChucVu.Where(c => c.ChucVuId != id && c.Name == name).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }
    }

}

