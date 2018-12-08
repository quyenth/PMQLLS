using Framework.Common;
using Application.Domain.Entity;
using System.Data;

namespace Application.Domain.Services
{
    public interface IUserRoleService : IBaseService<UserRole, ApplicationContext>
    {
        DataTable GetListUserRole(string users, string role , PagingInfo paging);

        DataTable GetUserRoleByUserId(string userId);
    }
}
