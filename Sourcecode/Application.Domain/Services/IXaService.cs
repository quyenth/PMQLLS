using Framework.Common;
using Application.Domain.Entity;

namespace Application.Domain.Services
{
    public interface IXaService : IBaseService<Xa, ApplicationContext>
    {
        bool CheckCodeIsUnique(int xaId, string maXa);
        bool CheckNameIsUnique(int xaId, string tenXa);
    }
}
