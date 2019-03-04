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
    [Route("api/LoaiDoiTuong/[action]")]
    //[Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    [Authorize]
    public class LoaiDoiTuongController : ControllerBase
    {
        private ILoaiDoiTuongService loaiDoiTuongService;
        public LoaiDoiTuongController (ILoaiDoiTuongService loaiDoiTuongService)
        {
            this.loaiDoiTuongService = loaiDoiTuongService;
        }
        /// <summary>
        /// save loaiDoiTuong
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if Id = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] LoaiDoiTuong model)
        {
            if (model.Id == 0)
            {
                var added = loaiDoiTuongService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                loaiDoiTuongService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list LoaiDoiTuong
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = loaiDoiTuongService.Filter(filterCondition , out total);
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
        /// get LoaiDoiTuong by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = loaiDoiTuongService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">LoaiDoiTuong entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] LoaiDoiTuong model)
        {
            loaiDoiTuongService.Delete(c => c.Id == model.Id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.Id
            };
        }
        /// <summary>
        /// delete list LoaiDoiTuong
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<LoaiDoiTuong> items)
        {
            var ids = items.Select(item => item.Id).ToList();
            loaiDoiTuongService.Delete(c => ids.Contains(c.Id));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list loaiDoiTuong
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<LoaiDoiTuong> items)
        {
            loaiDoiTuongService.Add(items);
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
        /// <returns></returns>

        [HttpGet]
        public async Task<ApiResult> CheckNameIsUnique(int id, string name)
        {
            var result = loaiDoiTuongService.CheckNameIsUnique(id, name);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// CheckCodeIsUnique
        /// </summary>
        /// <param name="id"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ApiResult> CheckCodeIsUnique(int id, string code)
        {
            var result = loaiDoiTuongService.CheckCodeIsUnique(id, code);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// GetListAllLoaiDoiTuong
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ApiResult> GetListAllLoaiDoiTuong()
        {
            var result = loaiDoiTuongService.GetListAllLoaiDoiTuong();
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

    }
}