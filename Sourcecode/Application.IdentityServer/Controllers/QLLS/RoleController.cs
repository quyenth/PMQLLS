using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Framework.AspNetIdentity;
using Framework.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/Role/[action]")]
    public class RoleController : Controller
    {

        private readonly ILogger logger;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<ApplicationRole> roleManager;

        public RoleController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<ApplicationUser> logger , RoleManager<ApplicationRole> roleManager)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;

        }

        [HttpPost]
        public async Task<ApiResult> Save([FromBody] ApplicationRole model)
        {
            bool roleIsExist = await roleManager.RoleExistsAsync(model.Name);
            if (!roleIsExist)
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
        /// 
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
    }
}