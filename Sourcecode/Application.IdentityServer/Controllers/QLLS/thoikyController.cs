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
    [Route("api/ThoiKy/[action]")]
    public class ThoiKyController : ControllerBase
    {
        private IThoiKyService thoiKyService;
        public ThoiKyController (IThoiKyService thoiKyService)
        {
            this.thoiKyService = thoiKyService;
        }
        /// <summary>
        /// save thoiKy
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if Id = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] ThoiKy model)
        {
            if (model.Id == 0)
            {
                var added = thoiKyService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                thoiKyService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list ThoiKy
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = thoiKyService.Filter(filterCondition , out total);
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
        /// get ThoiKy by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = thoiKyService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">ThoiKy entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] ThoiKy model)
        {
            thoiKyService.Delete(c => c.Id == model.Id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.Id
            };
        }
        /// <summary>
        /// delete list ThoiKy
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<ThoiKy> items)
        {
            var ids = items.Select(item => item.Id).ToList();
            thoiKyService.Delete(c => ids.Contains(c.Id));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list thoiKy
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<ThoiKy> items)
        {
            thoiKyService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }

        /// <summary>
        /// check name is unique
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task< ApiResult> CheckNameIsUnique(int id, string name)
        {
            var result = thoiKyService.CheckNameIsUnique(id, name);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }


        
    }
}