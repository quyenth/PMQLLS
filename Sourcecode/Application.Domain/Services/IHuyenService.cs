using Framework.Common;
using Application.Domain.Entity;
using System.Collections;

namespace Application.Domain.Services
{
    public interface IHuyenService : IBaseService<Huyen, ApplicationContext>
    {
        bool CheckCodeIsUnique(int huyenId, string maHuyen);
        bool CheckNameIsUnique(int huyenId, string tenHuyen);
        IList getListAllHuyen();

        IList getListHuyenByTinh(int tinhId);
    }
}
