using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;

namespace Framework.Common
{
    public class JwtTokenManager: IJwtTokenManagerService
    {
        //private readonly string _securityKey;
        //private readonly string _issuer;
        //private readonly string _audience;
        //private readonly int _expireDay;
        private readonly JwtSettings _appSettings;

        public JwtTokenManager(IOptions<JwtSettings> appsetting)
        {
            _appSettings = appsetting.Value;
            //_securityKey = _appSettings.SecurityKey;
            //_issuer = _appSettings.Issuer;
            //_audience = _appSettings.Audience;
            //_expireDay = _appSettings.ExpireDay;
        }
        public string GenerateToken(List<Claim> claims)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //set the time when it expires
            DateTime expires = DateTime.UtcNow.AddDays(_appSettings.ExpireDay);

            //http://stackoverflow.com/questions/18223868/how-to-encrypt-jwt-security-token
            var tokenHandler = new JwtSecurityTokenHandler();

            //create a identity and add claims to the user which we want to log in
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims);




            var now = DateTime.UtcNow;
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(_appSettings.SecurityKey));
            var signingCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(securityKey, Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256Signature);


            //create the jwt
            var token =
                (JwtSecurityToken)
                    tokenHandler.CreateJwtSecurityToken(issuer: _appSettings.Issuer, audience: _appSettings.Audience,
                        subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        public string GenerateToken(List<KeyValuePair<string, string>> keyValuePairs)
        {
            List<Claim> claims = new List<Claim>();
            claims = keyValuePairs.Select(c => new Claim( c.Key, c.Value)).ToList();
            return GenerateToken(claims);
        }

        public ClaimsPrincipal GetClaimsPrincipal(string token)
        {
            var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(_appSettings.SecurityKey));
            SecurityToken securityToken;
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            TokenValidationParameters validationParameters = new TokenValidationParameters()
            {
                ValidAudience = _appSettings.Audience,
                ValidIssuer = _appSettings.Issuer,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                LifetimeValidator = LifetimeValidator,
                IssuerSigningKey = securityKey
            };

            var claimsPrincipal = handler.ValidateToken(token, validationParameters, out securityToken);
            return claimsPrincipal;
        }

        public T GetDataByClaimType<T>(string claimType, string token)
        {
            return GetDataByClaimType<T>(claimType, token, default(T));
        }

        public T GetDataByClaimType<T>(string claimType, string token, T defaultValue)
        {
            var claimsPrincipal = GetClaimsPrincipal(token);
            var result = claimsPrincipal.FindFirst(c => c.Type == claimType);
            try
            {
                return (T)Convert.ChangeType(result.Value, typeof(T));
            }
            catch (Exception ex)
            {
                return defaultValue;
            }
        }


        bool TryRetrieveToken(HttpRequestMessage httpRequest, out string token)
        {
            token = null;
            IEnumerable<string> authzHeaders;

            
            if ((!httpRequest.Headers.TryGetValues("Authorization", out authzHeaders) )|| authzHeaders.Count() == 0 || authzHeaders.Count() > 1)
            {
                return false;
            }
            var bearerToken = authzHeaders.ElementAt(0);
            token = bearerToken.StartsWith("Bearer ") ? bearerToken.Substring(7) : bearerToken;
            return true;
        }

        private  bool LifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (expires != null)
            {
                if (DateTime.UtcNow < expires) return true;
            }
            return false;
        }

    }
}
