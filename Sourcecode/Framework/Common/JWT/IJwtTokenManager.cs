using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Framework.Common
{
    public interface IJwtTokenManagerService
    {
        string GenerateToken(List<Claim> claims);
        string GenerateToken(List<KeyValuePair<string, string>> keyValuePairs);
        ClaimsPrincipal GetClaimsPrincipal(string token);
        T GetDataByClaimType<T>(string claimType, string token);
        T GetDataByClaimType<T>(string claimType, string token, T defaultValue);
    }
}
