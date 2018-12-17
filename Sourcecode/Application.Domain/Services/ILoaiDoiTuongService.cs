using Framework.Common;
using Application.Domain.Entity;
using System.Collections;

namespace Application.Domain.Services
{
    
    public interface ILoaiDoiTuongService : IBaseService<LoaiDoiTuong, ApplicationContext>
    {
        /// <summary>
        /// CheckNameIsUnique
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        bool CheckNameIsUnique(int id, string name);

        /// <summary>
        /// CheckCodeIsUnique
        /// </summary>
        /// <param name="id"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        bool CheckCodeIsUnique(int id, string code);

        /// <summary>
        /// GetListAllLoaiDoiTuong
        /// </summary>
        /// <returns></returns>
        IList GetListAllLoaiDoiTuong();

    }
}
