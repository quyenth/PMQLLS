using Framework.Common;
using Application.Domain.Entity;

namespace Application.Domain.Services
{
    public interface IMatTranService : IBaseService<MatTran, ApplicationContext>
    {
        bool CheckCodeIsUnique(int id, string ma);

    }
}
