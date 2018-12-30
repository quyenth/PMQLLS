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
using System.Linq.Dynamic;

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/Xa/[action]")]
    public class XaController : ControllerBase
    {
        private ApplicationContext context;
        private IXaService xaService;
        public XaController(IXaService xaService, ApplicationContext context)
        {
            this.xaService = xaService;
            this.context = context;
        }
        /// <summary>
        /// save xa
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if XaId = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] Xa model)
        {
            if (model.XaId == 0)
            {
                var added = xaService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                xaService.Update(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list Xa
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Search([FromBody]FilterCondition filterCondition)
        {

           // var s = context.Xa.Where("TenXa.Contains(@0)", "ab").ToList();

            int total = 0;
            var list = xaService.Filter(filterCondition, out total).ToList();
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
        /// get Xa by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = xaService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">Xa entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task<ApiResult> Delete([FromBody] Xa model)
        {
            xaService.Delete(c => c.XaId == model.XaId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.XaId
            };
        }
        /// <summary>
        /// delete list Xa
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> DeleteList([FromBody]List<Xa> items)
        {
            var ids = items.Select(item => item.XaId).ToList();
            xaService.Delete(c => ids.Contains(c.XaId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list xa
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> AddList([FromBody]List<Xa> items)
        {
            xaService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }

        /// <summary>
        /// CheckCodeIsUnique
        /// </summary>
        /// <param name="xaId"></param>
        /// <param name="maXa"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> CheckCodeIsUnique(int xaId, string maXa)
        {
            var result = xaService.CheckCodeIsUnique(xaId, maXa);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// CheckNameIsUnique
        /// </summary>
        /// <param name="xaId"></param>
        /// <param name="tenXa"></param>
        /// <returns>bool</returns>
        [HttpGet]
        public async Task<ApiResult> CheckNameIsUnique(int xaId, string tenXa)
        {
            var result = xaService.CheckNameIsUnique(xaId, tenXa);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

    }
}