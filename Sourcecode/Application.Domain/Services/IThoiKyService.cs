using Framework.Common;
using Application.Domain.Entity;
using System.Collections;

namespace Application.Domain.Services
{
    public interface IThoiKyService : IBaseService<ThoiKy, ApplicationContext>
    {
        bool CheckNameIsUnique(int id, string name);

        IList GetListAllThoiKy();

    }


}
