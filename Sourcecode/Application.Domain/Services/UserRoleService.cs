using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System;
using Application.Domain.common;

namespace Application.Domain.Services
{
    public class UserRoleService : BaseService<UserRole, ApplicationContext>, IUserRoleService
    {
        public UserRoleService(ILogger<UserRoleService> logger, ApplicationContext context) : base(logger,context)
        {
        }


        /// <summary>
        /// GetListUserRole
        /// </summary>
        /// <param name="users"></param>
        /// <param name="role"></param>
        /// <param name="paging"></param>
        /// <returns></returns>
        public DataTable GetListUserRole(string users, string role, PagingInfo paging)
        {
            List<SqlParameter> paras = new List<SqlParameter>()
            {
                new SqlParameter("@PageSize", paging.PageSize),
                new SqlParameter("@PageIndex", paging.PageIndex)
            };

            SqlParameter countPara = new SqlParameter()
            {
                ParameterName = "@Count",
                Direction = ParameterDirection.Output,
                SqlDbType = SqlDbType.Int
            };
            if (string.IsNullOrEmpty(users) || users == "null")
            {
                paras.Add(new SqlParameter("@Users", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@Users", users));
            }

            if (string.IsNullOrEmpty(role) ||  role == "null")
            {
                paras.Add(new SqlParameter("@Role", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@Role", role));
            }

            paras.Add(countPara);
            var result = Sqlhelper.ExecDataTable(this.dc, StoredProcedureConstant.GetListUserRole , CommandType.StoredProcedure, paras.ToArray());
            paging.TotalCount = (int)countPara.Value;
            return result;
        }

        /// <summary>
        /// GetUserRoleByUserId
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public DataTable GetUserRoleByUserId(string userId)
        {
            List<SqlParameter> paras = new List<SqlParameter>()
            {
                new SqlParameter("@userId", userId),
            };
            var result = Sqlhelper.ExecDataTable(this.dc, StoredProcedureConstant.GetUserRoleByUserId , CommandType.StoredProcedure, paras.ToArray());
            return result;
        }
    }
}

