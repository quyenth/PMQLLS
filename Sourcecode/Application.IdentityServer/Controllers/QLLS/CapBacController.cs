using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Application.Domain.Services;
using Framework.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/CapBac")]
    public class CapBacController : ControllerBase
    {
        private ICapBacService capBacService;
        public CapBacController (ICapBacService capBacService)
        {
            this.capBacService = capBacService;
        }

        [HttpPost]
        [Route("")]
        public async Task<ApiResult> save([FromBody] CapBac model)
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

        [HttpGet]
        [Route("")]
        public async Task<ApiResult> search(FilterCondition filterCondition)
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

        [HttpPost]
        [Route("Delete")]
        public ApiResult Delete([FromBody] CapBac model)
        {
            capBacService.Delete(c => c.CapBacId == model.CapBacId);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.CapBacId
            };
        }

        [HttpPost]
        [Route("DeleteList")]
        public ApiResult DeleteList(List<CapBac> items)
        {
            var ids = items.Select(item => item.CapBacId).ToList();
            capBacService.Delete(c => ids.Contains(c.CapBacId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }

        [HttpPost]
        [Route("AddList")]
        public ApiResult AddList(List<CapBac> items)
        {
            capBacService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
    }
}