using System;
using System.Collections.Generic;
using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace Application.Domain.Services
{
    public class DoiTuongService : BaseService<DoiTuong, ApplicationContext>, IDoiTuongService
    {
        public DoiTuongService(ILogger<DoiTuongService> logger, ApplicationContext context) : base(logger,context)
        {
        }

        public bool CheckNameIsUnique(int id, string name)
        {
            var result = this.dc.DoiTuong.Where(c => c.DoiTuongId != id && c.Name == name).ToList();
            if (result.Count > 0)
            {
                return false;
            }

            return true;
        }
    }
}

