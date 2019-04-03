using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Application.Domain.Services;
using Framework.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/NghiaTrang/[action]")]
    [Authorize]
    public class NghiaTrangController : ControllerBase
    {
        private INghiaTrangService nghiaTrangService;
        public NghiaTrangController (INghiaTrangService nghiaTrangService)
        {
            this.nghiaTrangService = nghiaTrangService;
        }
        /// <summary>
        /// save nghiaTrang
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if NghiaTrangId = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] NghiaTrang model)
        {
            if (model.NghiaTrangId == 0)
            {
                var added = nghiaTrangService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                nghiaTrangService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list NghiaTrang
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = nghiaTrangService.Filter(filterCondition , out total);
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
        /// get NghiaTrang by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = nghiaTrangService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">NghiaTrang entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] NghiaTrang model)
        {
            nghiaTrangService.Delete(c => c.NghiaTrangId == model.NghiaTrangId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.NghiaTrangId
            };
        }
        /// <summary>
        /// delete list NghiaTrang
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<NghiaTrang> items)
        {
            var ids = items.Select(item => item.NghiaTrangId).ToList();
            nghiaTrangService.Delete(c => ids.Contains(c.NghiaTrangId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list nghiaTrang
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<NghiaTrang> items)
        {
            nghiaTrangService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }


        [HttpGet]
        public async Task<ApiResult> getListNghiaTrang()
        {
            var result = nghiaTrangService.getListNghiaTrang();
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }
    }
}