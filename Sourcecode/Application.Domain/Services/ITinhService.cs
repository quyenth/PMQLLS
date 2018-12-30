using Framework.Common;
using Application.Domain.Entity;
using System.Collections;

namespace Application.Domain.Services
{
    public interface ITinhService : IBaseService<Tinh, ApplicationContext>
    {
        bool CheckCodeIsUnique(int tinhId, string maTinh);
        bool CheckNameIsUnique(int tinhId, string tenTinh);

        IList getListAllTinh();
    }
}
