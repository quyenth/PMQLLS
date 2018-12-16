using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections;

namespace Application.Domain.Services
{
    public class DiemCaoService : BaseService<DiemCao, ApplicationContext>, IDiemCaoService
    {
        public DiemCaoService(ILogger<DiemCaoService> logger, ApplicationContext context) : base(logger,context)
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
            var result = this.dc.DiemCao.Where(c => c.DiemCaoId != id && c.Ma == code).ToList();
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
            var result = this.dc.DiemCao.Where(c => c.DiemCaoId != id && c.Ten == name).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        public IList GetListAllDiemCao()
        {
            return this.dc.DiemCao.ToList();
        }
    }
}

