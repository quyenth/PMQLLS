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
using Swashbuckle.AspNetCore.Annotations;

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/Tinh/[action]")]
    [ApiExplorerSettings(IgnoreApi = false)]

    [Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    public class TinhController : Controller
    {
        private ITinhService tinhService;

        public TinhController(ITinhService tinhService)
        {
            this.tinhService = tinhService;
        }

        /// <summary>
        /// Create or Update Tinh
        /// </summary>
        /// <param name="modal">Tinh modal</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] Tinh modal)
        {
            //add
            if (modal.TinhId == 0)
            {
                var added = tinhService.Add(modal);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                tinhService.Update(modal);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = modal
                };
            }
        }


        /// <summary>
        /// filter data by multiple condition
        /// </summary>
        /// <param name="filter">
        /// </param>
        /// <remarks>
        /// OperationType:
        /// 0:EqualTo,
        /// 1:NotEqualTo,
        /// 2:GreaterThan,
        /// 3:GreaterThanEqualTo,
        /// 4:LessThan,
        /// 5:LessThanEqualTo,
        /// 6:Contains,
        /// 7:StartsWith,
        /// 8:EndsWith
        /// </remarks>
        /// <returns>
        /// </returns>
        [HttpPost]

        [SwaggerResponse(200, "Result", typeof(ApiResult))]
        [SwaggerResponse(2001, "ApiResult.data", typeof(List<Tinh>))]

        public async Task<ApiResult> Filter([FromBody] FilterCondition filter)
        {
            int total = 0;
            var list = tinhService.Filter(filter, out total);
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

    }
}