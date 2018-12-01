using Framework.Common;
using Application.Domain.Entity;

namespace Application.Domain.Services
{
    public interface IDoiTuongService : IBaseService<DoiTuong, ApplicationContext>
    {
        bool CheckNameIsUnique(int id, string name);

    }
}
