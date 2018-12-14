using Application.Domain.Entity;
using Framework.Common;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace Application.Domain.Services
{
    public interface ISoQuyenService : IBaseService<SoQuyen, ApplicationContext>
    {
        bool CheckNameIsUnique(int id, string name);

        IList getListAllSoQuyen();

    }
}
