using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Application.Domain.Services;
using AspNetCore.Data;
using Framework.AspNetIdentity;
using Framework.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/LietSy/[action]")]
    public class LietSyController : ControllerBase
    {
        private ILietSyService lietSyService;

        private readonly UserManager<ApplicationUser> userManager;

        public LietSyController (ILietSyService lietSyService , UserManager<ApplicationUser> userManager)
        {
            this.lietSyService = lietSyService;
            this.userManager = userManager;

        }
        /// <summary>
        /// save lietSy
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if Id = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] LietSy model)
        {
            var user = HttpContext.User;
            var userId = userManager.GetUserId(User);

            if (model.Id == 0)
            {               
                model.Created = DateTime.Now;
                model.Updated = DateTime.Now;
                model.CreatdedBy = userId;
                model.UpdatedBy = userId;
                var added = lietSyService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                model.Updated = DateTime.Now;
                lietSyService.Update(model);
                model.UpdatedBy = userId;
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list LietSy
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]LietSiFilterCondition filterCondition)
        {
            var listOfStrings = new List<string>();
            PagingInfo paging = new PagingInfo
                                {
                                    PageIndex = filterCondition.PageIndex,
                                    PageSize = filterCondition.PageSize
                                };
            var result = lietSyService.SearchListLietSi(filterCondition.searchCodition, paging);
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
        /// get LietSy by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = lietSyService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">LietSy entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] LietSy model)
        {
            lietSyService.Delete(c => c.Id == model.Id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.Id
            };
        }
        /// <summary>
        /// delete list LietSy
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<LietSy> items)
        {
            var ids = items.Select(item => item.Id).ToList();
            lietSyService.Delete(c => ids.Contains(c.Id));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list lietSy
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<LietSy> items)
        {
            lietSyService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }


        
    }
}