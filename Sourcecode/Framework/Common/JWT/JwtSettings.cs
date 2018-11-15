using System;
using System.Collections.Generic;
using System.Text;

namespace Framework.Common
{
    public class JwtSettings
    {
        public string SecurityKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int ExpireDay { get; set; }

    }
}
