using Framework.Common;
using Application.Domain.Entity;
using System.Collections;

namespace Application.Domain.Services
{
    public interface IDonViService : IBaseService<DonVi, ApplicationContext>
    {
        IList getListAllDonVI();
    }
}
