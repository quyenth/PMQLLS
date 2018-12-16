using Framework.Common;
using Application.Domain.Entity;
using System.Collections;

namespace Application.Domain.Services
{
    public interface ICapBacService : IBaseService<CapBac, ApplicationContext>
    {
        bool CheckNameIsUnique(int capBacId, string name);

        IList GetListAllCapBac();

    }


}
