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
    [Route("api/ChucVu/[action]")]
    public class ChucVuController : ControllerBase
    {
        private IChucVuService chucVuService;
        public ChucVuController (IChucVuService chucVuService)
        {
            this.chucVuService = chucVuService;
        }
        /// <summary>
        /// save chucVu
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if ChucVuId = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] ChucVu model)
        {
            if (model.ChucVuId == 0)
            {
                var added = chucVuService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                chucVuService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list ChucVu
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = chucVuService.Filter(filterCondition , out total);
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
        /// get ChucVu by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = chucVuService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">ChucVu entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] ChucVu model)
        {
            chucVuService.Delete(c => c.ChucVuId == model.ChucVuId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.ChucVuId
            };
        }
        /// <summary>
        /// delete list ChucVu
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<ChucVu> items)
        {
            var ids = items.Select(item => item.ChucVuId).ToList();
            chucVuService.Delete(c => ids.Contains(c.ChucVuId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list chucVu
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<ChucVu> items)
        {
            chucVuService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }


        
    }
}