using Framework.Common;
using Application.Domain.Entity;
using System.Collections;

namespace Application.Domain.Services
{
    public interface IDonViService : IBaseService<DonVi, ApplicationContext>
    {
        bool CheckCodeIsUnique(int donViId, string maDonVi);
        bool CheckNameIsUnique(int donViId, string tenDonVi);
        IList getListAllDonVI();
    }
}
