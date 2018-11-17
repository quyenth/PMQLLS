using Application.Domain.Entity;
using Framework.Common;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Domain.Services
{
    public class PupilService : BaseService<Pupil, ApplicationContext>, IPupilService
    {
        public PupilService(ILogger<PupilService> logger) : base(logger)
        {
        }
    }
}
