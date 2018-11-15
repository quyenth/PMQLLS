using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AspNetCore.Data;
using Framework.AspNetIdentity;
using Microsoft.AspNetCore.Authorization;
using IdentityModel.Client;

namespace AspNetCore.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger _logger;

        public AccountController(SignInManager<ApplicationUser> signInManager, ILogger<AccountController> logger,UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _logger = logger;
            _userManager = userManager;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            
            await _signInManager.SignOutAsync();
            _logger.LogInformation("User logged out.");
            return RedirectToPage("/Index");
        }
       
        public ActionResult Index()
        {
            var s = 1;
            return View();
        }

        public async Task<IActionResult> Signin(string userName, string password)
        {
            _logger.LogInformation("Test log");
            var disco = await DiscoveryClient.GetAsync("https://localhost:44302/");
            if (disco.IsError)
            {
                return BadRequest(disco.Error);
            }

            var tokenClient = new TokenClient(disco.TokenEndpoint, "ApiApplication", "secret");
            var tokenResponse = await tokenClient.RequestResourceOwnerPasswordAsync(userName, password, "api2");

            if (tokenResponse.IsError)
            {
                return BadRequest(tokenResponse.Error);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _userManager.FindByNameAsync(userName);

            var result = await _userManager.FindByNameAsync(userName);

            if (result != null && await _userManager.CheckPasswordAsync(result, password))
            {
                return Ok(tokenResponse);
            }

            return BadRequest("Invalid username or password.");
        }
    }
}
