using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Domain.model;
using Framework.AspNetIdentity;
using Framework.Common;
using IdentityModel.Client;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Application.IdentityServer.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    [ApiExplorerSettings(IgnoreApi = false)]
    public class AccountController : Controller
    {
        private readonly ILogger logger;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly ApplicationUserRole applicationUserRole;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager
                    , ILogger<ApplicationUser> logger , RoleManager<ApplicationRole> roleManager)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
        }

        [HttpGet]
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

        [HttpPost]
        public async Task<ApiResult> SignUp([FromBody] LoginModel model)
        {
            ApplicationUser user = new ApplicationUser()
            {
                UserName=model.UserName
            };
           await  userManager.CreateAsync(user, model.Password);
            return new ApiResult()
            {
                Status = HttpStatus.OK

            };
        }

        [HttpGet]
        public async Task<ApiResult> GetListUser()
        {
            var list = this.userManager?.Users.Select(c => new UserVO { Id = c.Id , FullName = c.FullName , PhoneNumber = c.PhoneNumber , UserName =c.UserName}).ToList();
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = list
            };
        }

        /// <summary>
        /// CheckEmailIsInUse
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ApiResult> CheckEmailIsInUse(string email)
        {
            //var list = this.userManager?.Users.Select(c => new UserVO { Id = c.Id, FullName = c.FullName, PhoneNumber = c.PhoneNumber, UserName = c.UserName }).ToList();
            var user = await this.userManager.FindByEmailAsync(email);
            bool result = false;
            if(user != null)
            {
                result = true;
            }
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        public async Task<ApiResult> GetCurentUserInfo()
        {
            var emailClaims = User.Claims.FirstOrDefault(c => c.Type == "name");
            var email = emailClaims != null ? emailClaims.Value : "";
            var user = await this.userManager.FindByEmailAsync(email);
            //this.applicationUserRole.get
            var roles = await userManager.GetRolesAsync(user);

            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = new
                {
                    Email = user.Email,
                    FullName = user.FullName,
                    UserName = user.UserName,
                    roles = roles
                }
            };
        }

    }
}