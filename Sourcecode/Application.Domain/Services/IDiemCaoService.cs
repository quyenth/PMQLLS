using Framework.Common;
using Application.Domain.Entity;

namespace Application.Domain.Services
{
    public interface IDiemCaoService : IBaseService<DiemCao, ApplicationContext>
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
    }
}
