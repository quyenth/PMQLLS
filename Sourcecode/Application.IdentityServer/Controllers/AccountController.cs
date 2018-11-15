using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Framework.AspNetIdentity;
using IdentityModel.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Application.IdentityServer.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
       private readonly ILogger logger;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<ApplicationUser> logger)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;

        }
        public async Task<IActionResult> Signin(string userName, string password,string clientId= "ApiApplication", string secret= "secret", string scope= "api")
        {

            var authority = Request.Scheme +"://" + Request.Host;
            var disco = await DiscoveryClient.GetAsync(authority);
            if (disco.IsError)
            {
                return BadRequest(disco.Error);
            }

            var tokenClient = new TokenClient(disco.TokenEndpoint, clientId, secret);
            var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync(userName, password,scope);

            if (tokenResponse.IsError)
            {
                return BadRequest(tokenResponse.Error);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = userManager.FindByNameAsync(userName);

            var result = await userManager.FindByNameAsync(userName);

            if (result != null && await userManager.CheckPasswordAsync(result, password))
            {
                return Ok(tokenResponse);
            }

            return BadRequest("Invalid username or password.");
        }
    }
}