using Application.Domain.Entity;
using Framework.Common;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Collections;

namespace Application.Domain.Services
{
    public class SoQuyenService : BaseService<SoQuyen, ApplicationContext>, ISoQuyenService
    {
        public SoQuyenService(ILogger<SoQuyenService> logger, ApplicationContext context) : base(logger, context)
        {

        }

        /// <summary>
        /// CheckNameIsUnique
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <returns>bool</returns>
        public bool CheckNameIsUnique(int id, string name)
        {
            var result = this.dc.SoQuyen.Where(c => c.Id != id && c.Name == name).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// getListAllSoQuyen
        /// </summary>
        /// <returns></returns>
        public IList getListAllSoQuyen()
        {
            return this.dc.SoQuyen.ToList();
        }
    }
}
