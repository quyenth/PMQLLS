using Application.Domain.Entity;
using Framework.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Domain.Services
{
    public interface INghiaTrangService : IBaseService<NghiaTrang, ApplicationContext>
    {
        object getListNghiaTrang();
    }
}
