using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Framework.AspNetIdentity;
using IdentityModel.Client;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Framework.Common;

namespace Application.IdentityServer.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth/[action]")]
    [ApiExplorerSettings(IgnoreApi = false)]
    public class AuthController : Controller
    {
        private readonly SignInManager<ApplicationUser> signInManager;

        private readonly UserManager<ApplicationUser> userManager;
        private readonly ILogger logger;

        public AuthController(SignInManager<ApplicationUser> signInManager, ILogger<AccountController> logger, UserManager<ApplicationUser> userManager)
        {
            this.signInManager = signInManager;
            this.logger = logger;
            this.userManager = userManager;
        }

        /// <summary>
        /// login
        /// </summary>
        /// <param name="model"></param>
        /// <returns>typeof(ApiResult)</returns>
        /// 
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {

            string clientId = "ApiApplication";
            string secret = "secret";
            string scope = "api2 openid";
            var authority = Request.Scheme + "://" + Request.Host;
            var disco = await DiscoveryClient.GetAsync(authority);
            if (disco.IsError)
            {
                return BadRequest(disco.Error);
            }

            var tokenClient = new TokenClient(disco.TokenEndpoint, clientId, secret);
            var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync(model.UserName, model.Password, scope);

            if (tokenResponse.IsError)
            {
                return BadRequest(tokenResponse.Error);
            }
           
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            ////var user = userManager.FindByNameAsync(model.UserName);

            var result = await userManager.FindByNameAsync(model.UserName);

            if (result != null && await userManager.CheckPasswordAsync(result, model.Password))
            {
                return Ok(new ApiResult() { Data = tokenResponse.AccessToken, Status = HttpStatus.OK });
            }

            return Ok(new ApiResult()
            {
                Message="",
                Status = HttpStatus.HandleError
            });
        }
    }
}