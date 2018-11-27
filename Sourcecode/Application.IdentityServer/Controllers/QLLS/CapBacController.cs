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
    [Route("api/CapBac/[action]")]
    public class CapBacController : ControllerBase
    {
        private ICapBacService capBacService;
        public CapBacController (ICapBacService capBacService)
        {
            this.capBacService = capBacService;
        }
        /// <summary>
        /// save cấp bậc
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if capbacId = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] CapBac model)
        {
            if (model.CapBacId == 0)
            {
                var added = capBacService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                capBacService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list cap bac 
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = capBacService.Filter(filterCondition , out total);
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
        /// get cap bac by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = capBacService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">cap bac entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] CapBac model)
        {
            capBacService.Delete(c => c.CapBacId == model.CapBacId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.CapBacId
            };
        }
        /// <summary>
        /// delete list cap bac
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<CapBac> items)
        {
            var ids = items.Select(item => item.CapBacId).ToList();
            capBacService.Delete(c => ids.Contains(c.CapBacId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list cap bac
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<CapBac> items)
        {
            capBacService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }


        /// <summary>
        /// Check cấp bậc is unique 
        /// </summary>
        /// <param name="capBacId"></param>
        /// <param name="name"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task< ApiResult> CheckNameIsUnique(int capBacId, string name)
        {
            var result = capBacService.CheckNameIsUnique(capBacId, name);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }
    }
}