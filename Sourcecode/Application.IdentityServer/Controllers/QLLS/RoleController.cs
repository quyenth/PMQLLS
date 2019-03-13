using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Application.Domain.model;
using Application.Domain.Services;
using Framework.AspNetIdentity;
using Framework.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/Role/[action]")]
    //[Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    [Authorize]
    public class RoleController : Controller
    {

        private readonly ILogger logger;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly IUserRoleService UserRoleService;
        private readonly IUserProvincerService _userProvincerService;
        private readonly Application.Domain.Entity.ApplicationContext context;


        public RoleController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, 
                        ILogger<ApplicationUser> logger , RoleManager<ApplicationRole> roleManager , 
                        IUserRoleService UserRoleService , IUserProvincerService UserProvincerService , Application.Domain.Entity.ApplicationContext context)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.UserRoleService = UserRoleService;
            this._userProvincerService = UserProvincerService;
        }

        /// <summary>
        /// Save Role
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] ApplicationRole model)
        {
            if (string.IsNullOrEmpty(model.Id) || model.Id == "0")
            {
                var entity = new ApplicationRole();
                entity.Id = DateTime.Now.ToFileTime().ToString();
                entity.Name = model.Name;
                entity.ConcurrencyStamp = DateTime.Now.ToFileTime().ToString();               
             
                 await this.roleManager.CreateAsync(entity);

                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }          
            else
            {               
                await this.roleManager.UpdateAsync(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }

        /// <summary>
        /// search list all role
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            var list = roleManager.Roles?.ToList();
            if(filterCondition.SearchCondition.Count > 0 && filterCondition.SearchCondition[0].FieldName == "Name" && filterCondition.SearchCondition[0].Value.ToString() != "")
            {
                var nameSeach = filterCondition.SearchCondition[0].Value.ToString();
                list = list.AsQueryable().Where(c => c.Name.Contains(nameSeach)).ToList();
            }
            int total = list.Count();
            if(filterCondition.Paging)
            {
                var skip = (filterCondition.PageIndex - 1) * filterCondition.PageSize;
                list = list.AsQueryable().Skip(skip).Take(filterCondition.PageSize).ToList();
            }
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = new
                {
                    Total = total,
                    List = list
                }
            };
        }

        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Delete([FromBody] ApplicationRole model)
        {
            await  this.roleManager.DeleteAsync(model);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.Id
            };
        }

        /// <summary>
        /// GetRoleById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(string id)
        {
            var result = this.roleManager.Roles?.FirstOrDefault(c=>c.Id == id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// DeleteListRole
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> DeleteList([FromBody]List<ApplicationRole> items)
        {
            foreach(var role in items)
            {
                await this.roleManager.DeleteAsync(role);
            }
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }

        /// <summary>
        /// GetAllRole
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ApiResult> GetAllRole()
        {
            var list = this.roleManager?.Roles.ToList();
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = list
            };
        }

        /// <summary>
        /// SaveUserRole
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> SaveUserRole([FromBody] UserRoleModel model)
        {

            var list = this.roleManager?.Roles.ToList();

            var adminRole = list.Find(c => c.Name == "Admin");

            if (adminRole != null && adminRole.Id != model.roleId && !string.IsNullOrEmpty(model.TinhId))
            {
                string[] listTinhId = model.TinhId.Split(',');
                var listUseProvincer = this.context.UseProvincer.Where(c => c.RoleId == model.roleId && c.UserId == model.userId);
                if (listUseProvincer != null)
                {
                    this.context.UseProvincer.RemoveRange(listUseProvincer);
                    this.context.SaveChanges();
                }
                List<UseProvincer> listAdd = new List<UseProvincer>();
                foreach (var item in listTinhId)
                {
                    listAdd.Add(new UseProvincer { ProvincerId = Convert.ToInt32(item), RoleId = model.roleId, UserId = model.userId });
                }
                this.context.UseProvincer.AddRange(listAdd);
                this.context.SaveChanges();
            }
            if (!string.IsNullOrEmpty(model.roleId))
            {
                //string[] listRoleId = model.roleId.Split(',');
                var user = await this.userManager.FindByIdAsync(model.userId);
                IList<string> roles = await this.userManager.GetRolesAsync(user);

                await userManager.RemoveFromRolesAsync(user, roles);

                var listAllRole = roleManager.Roles?.ToList();
                List<string> listRole = new List<string>();
                if(roles != null)
                {
                    listRole.AddRange(roles);
                }
                var role = listAllRole.FirstOrDefault(c => c.Id == model.roleId);
                if (role != null)
                {
                    listRole.Add(role.Name);
                }

                await userManager.AddToRolesAsync(user, listRole.Distinct().ToList().ToArray());
            }

            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model
            };
        }

        /// <summary>
        /// DeleteUserRole
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> DeleteUserRole([FromBody] UserRoleModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.UserName);
            var roles = await this.userManager.GetRolesAsync(user);
            if (roles.Count > 0)
            {
                await userManager.RemoveFromRolesAsync(user, roles.ToArray());                       
            }

            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model
            };
        }

        /// <summary>
        /// GetListUserRole
        /// </summary>
        /// <param name="users"></param>
        /// <param name="role"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet]
        public ApiResult GetListUserRole(string users , string role , int pageIndex , int pageSize)
        {
            PagingInfo paging = new PagingInfo { PageIndex = pageIndex, PageSize = pageSize };
            var result = UserRoleService.GetListUserRole(users, role , paging);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = new
                {
                    Total = paging.TotalCount,
                    List = result
                }
            };
        }

        /// <summary>
        /// GetUserRoleByUserId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public ApiResult GetUserRoleByUserId(string id)
        {
            var result = UserRoleService.GetUserRoleByUserId(id);

            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }
    }
}