using Application.Domain.Entity;
using Framework.Common;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Domain.Services
{
    public class UserProvincerService : BaseService<UseProvincer, ApplicationContext>, IUserProvincerService
    {      
        public UserProvincerService(ILogger<ChucVuService> logger, ApplicationContext context) : base(logger, context)
        {
        }
    }
}
