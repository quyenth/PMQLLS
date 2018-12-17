using Framework.Common;
using Application.Domain.Entity;
using System.Collections;

namespace Application.Domain.Services
{
    public interface IDoiTuongService : IBaseService<DoiTuong, ApplicationContext>
    {
        bool CheckNameIsUnique(int id, string name);

        IList GetListAllDoiTuong();

    }
}
