using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Application.Domain.Services;
using Framework.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Application.IdentityServer.Controllers.QLLS
{
    /// <summary>
    /// Chuc vu API
    /// </summary>
    [Produces("application/json")]
    [Route("api/Chucvu/[action]")]
    [ApiExplorerSettings(IgnoreApi = false)]

    [Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    public class ChucvuController : Controller
    {
        private IChucVuService chucVuService;
        public ChucvuController(IChucVuService chucVuService)
        {
            this.chucVuService = chucVuService;
        }

        /// <summary>
        /// Create or Update chucvu
        /// </summary>
        /// <param name="modal">Chuc vu modal</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] ChucVu modal)
        {
            //add
            if (modal.ChucVuId == 0)
            {
                var added = chucVuService.Add(modal);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                chucVuService.Update(modal);
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
        
        [SwaggerResponse(200,"Result",typeof(ApiResult))]
        [SwaggerResponse(2001, "ApiResult.data", typeof(List<ChucVu>))]

        public async Task<ApiResult> Filter([FromBody] FilterCondition filter)
        {
            int total = 0;
            var list = chucVuService.Filter(filter, out total);
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
        /// delete list chuc vu
        /// </summary>
        /// <param name="items">list chuc vu</param>
        /// <returns></returns>
        [HttpPost]
        public ApiResult Deletes([FromBody]List<ChucVu> items)
        {
            var ids = items.Select(item => item.ChucVuId).ToList();
            chucVuService.Delete(c => ids.Contains(c.ChucVuId));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }

    }
}