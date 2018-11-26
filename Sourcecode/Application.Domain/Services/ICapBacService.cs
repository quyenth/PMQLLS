using Framework.Common;
using Application.Domain.Entity;

namespace Application.Domain.Services
{
    public interface ICapBacService : IBaseService<CapBac, ApplicationContext>
    {
        bool CheckNameIsUnique(int capBacId, string name);
    }
}
