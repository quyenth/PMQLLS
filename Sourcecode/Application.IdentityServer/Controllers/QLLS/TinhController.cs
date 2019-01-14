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
    [Route("api/Tinh/[action]")]
    //[Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    public class TinhController : ControllerBase
    {
        private ITinhService tinhService;
        public TinhController (ITinhService tinhService)
        {
            this.tinhService = tinhService;
        }
        /// <summary>
        /// save tinh
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if TinhId = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] Tinh model)
        {
            if (model.TinhId == 0)
            {
                var added = tinhService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                tinhService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list Tinh
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = tinhService.Filter(filterCondition , out total);
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
        /// get Tinh by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = tinhService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">Tinh entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] Tinh model)
        {
            tinhService.Delete(c => c.TinhId == model.TinhId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.TinhId
            };
        }
        /// <summary>
        /// delete list Tinh
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<Tinh> items)
        {
            var ids = items.Select(item => item.TinhId).ToList();
            tinhService.Delete(c => ids.Contains(c.TinhId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list tinh
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<Tinh> items)
        {
            tinhService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }

        /// <summary>
        /// CheckCodeIsUnique
        /// </summary>
        /// <param name="tinhId"></param>
        /// <param name="maTinh"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> CheckCodeIsUnique(int tinhId, string maTinh)
        {
            var result = tinhService.CheckCodeIsUnique(tinhId, maTinh);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// CheckNameIsUnique
        /// </summary>
        /// <param name="tinhId"></param>
        /// <param name="tenTinh"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> CheckNameIsUnique(int tinhId, string tenTinh)
        {
            var result = tinhService.CheckNameIsUnique(tinhId, tenTinh);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// getListAllTinh
        /// </summary>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> getListAllTinh()
        {
            var result = tinhService.getListAllTinh();
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

    }
}