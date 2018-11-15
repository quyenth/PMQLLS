using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Framework.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotnetCore.Controllers
{
    /// <summary>
    /// Default API
    /// </summary>
    [Produces("application/json")]
    public class DefaultController : Controller
    {
        private IJwtTokenManagerService jwtTokenManagerService;
        public DefaultController(IJwtTokenManagerService _jwtTokenManagerService)
        {
            jwtTokenManagerService = _jwtTokenManagerService;
        }
        /// <summary>
        /// test api dongna
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/v1/default/Index")]
        [Authorize()]
        public string Index()
        {
            var keyvaluePairs = new List<KeyValuePair<string, string>>()
            {
               new KeyValuePair<string, string>("UserName","QuyenTH"),
               new KeyValuePair<string, string>("Password","12345"),
               new KeyValuePair<string, string>(ClaimTypes.Role,"Admin"),
            };

            return jwtTokenManagerService.GenerateToken(keyvaluePairs);
            return "OK";
        }

        /// <summary>
        /// get string value truyen vao tu api
        /// </summary>
        /// <param name="str">gia tri truyen vao tu api</param>
        /// <returns></returns>
        /// 
        [Authorize(Roles ="Admin,SystemAdmin")]
        [HttpGet]
        [Route("api/v1/default/GetStr")]
        public string GetStr(string str)
        {
            return str;
        }

        /// <summary>
        /// generate token
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     [
        ///         { "Key": "Value"},
        ///         { "Key1": "Value1"}
        ///     ]
        ///
        /// </remarks>
        /// <param name="ob"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/v1/default/generateToken")]
        public string generateToken([FromBody] List<KeyValuePair<string, string>> ob)
        {
            var t = ob as List<KeyValuePair<string, string>>;
            return jwtTokenManagerService.GenerateToken(t);
            
        }
    }
}