using Framework.Common;
using Application.Domain.Entity;
using System.Data;
using AspNetCore.Data;

namespace Application.Domain.Services
{
    public interface ILietSyService : IBaseService<LietSy, ApplicationContext>
    {
        DataTable SearchListLietSi(LietsiSearchCondition searchCodition, PagingInfo paging);

        DataTable ExportListLietSi(LietsiSearchCondition searchCodition);


    }
}
