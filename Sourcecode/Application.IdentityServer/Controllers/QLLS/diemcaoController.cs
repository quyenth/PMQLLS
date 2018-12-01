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
    [Route("api/DiemCao/[action]")]
    public class DiemCaoController : ControllerBase
    {
        private IDiemCaoService diemCaoService;
        public DiemCaoController (IDiemCaoService diemCaoService)
        {
            this.diemCaoService = diemCaoService;
        }
        /// <summary>
        /// save diemCao
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if DiemCaoId = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] DiemCao model)
        {
            if (model.DiemCaoId == 0)
            {
                var added = diemCaoService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                diemCaoService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list DiemCao
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = diemCaoService.Filter(filterCondition , out total);
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
        /// get DiemCao by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = diemCaoService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">DiemCao entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] DiemCao model)
        {
            diemCaoService.Delete(c => c.DiemCaoId == model.DiemCaoId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.DiemCaoId
            };
        }
        /// <summary>
        /// delete list DiemCao
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<DiemCao> items)
        {
            var ids = items.Select(item => item.DiemCaoId).ToList();
            diemCaoService.Delete(c => ids.Contains(c.DiemCaoId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list diemCao
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<DiemCao> items)
        {
            diemCaoService.Add(items);
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
            var result = diemCaoService.CheckNameIsUnique(id, name);
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
            var result = diemCaoService.CheckCodeIsUnique(id, code);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

    }
}