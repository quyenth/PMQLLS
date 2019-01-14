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
    [Route("api/Huyen/[action]")]
    //[Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    public class HuyenController : ControllerBase
    {
        private IHuyenService huyenService;
        public HuyenController (IHuyenService huyenService)
        {
            this.huyenService = huyenService;
        }
        /// <summary>
        /// save huyen
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if HuyenId = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] Huyen model)
        {
            if (model.HuyenId == 0)
            {
                var added = huyenService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                huyenService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list Huyen
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = huyenService.Filter(filterCondition , out total);
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
        /// get Huyen by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = huyenService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">Huyen entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] Huyen model)
        {
            huyenService.Delete(c => c.HuyenId == model.HuyenId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.HuyenId
            };
        }
        /// <summary>
        /// delete list Huyen
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<Huyen> items)
        {
            var ids = items.Select(item => item.HuyenId).ToList();
            huyenService.Delete(c => ids.Contains(c.HuyenId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list huyen
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<Huyen> items)
        {
            huyenService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        
        /// <summary>
        /// CheckCodeIsUnique
        /// </summary>
        /// <param name="huyenId"></param>
        /// <param name="maHuyen"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> CheckCodeIsUnique(int huyenId, string maHuyen)
        {
            var result = huyenService.CheckCodeIsUnique(huyenId, maHuyen);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// CheckNameIsUnique
        /// </summary>
        /// <param name="huyenId"></param>
        /// <param name="tenHuyen"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> CheckNameIsUnique(int huyenId, string tenHuyen)
        {
            var result = huyenService.CheckNameIsUnique(huyenId, tenHuyen);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// getListAllHuyen
        /// </summary>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> getListAllHuyen()
        {
            var result = huyenService.getListAllHuyen();
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// getListHuyenByTinh
        /// </summary>
        /// <param name="tinhId"></param>
        /// <returns></returns>
        [HttpGet]
        public ApiResult getListHuyenByTinh(int tinhId)
        {
            var result = huyenService.getListHuyenByTinh(tinhId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }
    }
}