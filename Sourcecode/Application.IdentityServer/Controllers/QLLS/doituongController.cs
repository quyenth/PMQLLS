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
    [Route("api/DoiTuong/[action]")]
    //[Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    public class DoiTuongController : ControllerBase
    {
        private IDoiTuongService doiTuongService;
        public DoiTuongController (IDoiTuongService doiTuongService)
        {
            this.doiTuongService = doiTuongService;
        }
        /// <summary>
        /// save doiTuong
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if DoiTuongId = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] DoiTuong model)
        {
            if (model.DoiTuongId == 0)
            {
                var added = doiTuongService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                doiTuongService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list DoiTuong
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = doiTuongService.Filter(filterCondition , out total);
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
        /// get DoiTuong by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = doiTuongService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">DoiTuong entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] DoiTuong model)
        {
            doiTuongService.Delete(c => c.DoiTuongId == model.DoiTuongId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.DoiTuongId
            };
        }
        /// <summary>
        /// delete list DoiTuong
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<DoiTuong> items)
        {
            var ids = items.Select(item => item.DoiTuongId).ToList();
            doiTuongService.Delete(c => ids.Contains(c.DoiTuongId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list doiTuong
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<DoiTuong> items)
        {
            doiTuongService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// CheckNameIsUnique
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> CheckNameIsUnique(int id, string name)
        {
            var result = doiTuongService.CheckNameIsUnique(id, name);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// GetListAllDoiTuong
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ApiResult> GetListAllDoiTuong()
        {
            var result = doiTuongService.GetListAllDoiTuong();
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }
    }
}