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
    [Route("api/MatTran/[action]")]
    //[Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    [Authorize]
    public class MatTranController : ControllerBase
    {
        private IMatTranService matTranService;
        public MatTranController (IMatTranService matTranService)
        {
            this.matTranService = matTranService;
        }
        /// <summary>
        /// save matTran
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if Id = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] MatTran model)
        {
            if (model.Id == 0)
            {
                var added = matTranService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                matTranService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list MatTran
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]FilterCondition filterCondition)
        {
            int total = 0;
            var list = matTranService.Filter(filterCondition , out total);
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
        /// get MatTran by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = matTranService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">MatTran entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] MatTran model)
        {
            matTranService.Delete(c => c.Id == model.Id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.Id
            };
        }
        /// <summary>
        /// delete list MatTran
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<MatTran> items)
        {
            var ids = items.Select(item => item.Id).ToList();
            matTranService.Delete(c => ids.Contains(c.Id));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list matTran
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<MatTran> items)
        {
            matTranService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// CheckCodeIsUnique
        /// </summary>
        /// <param name="capBacId"></param>
        /// <param name="name"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> CheckCodeIsUnique(int id, string ma)
        {
            var result = matTranService.CheckCodeIsUnique(id, ma);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

    }
}