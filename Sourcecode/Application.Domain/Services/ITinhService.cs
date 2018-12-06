using Framework.Common;
using Application.Domain.Entity;

namespace Application.Domain.Services
{
    public interface ITinhService : IBaseService<Tinh, ApplicationContext>
    {
        bool CheckCodeIsUnique(int tinhId, string maTinh);
        bool CheckNameIsUnique(int tinhId, string tenTinh);
    }
}
