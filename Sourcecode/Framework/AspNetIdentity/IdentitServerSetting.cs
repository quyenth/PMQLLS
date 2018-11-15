using System;
using System.Collections.Generic;
using System.Text;

namespace Framework.AspNetIdentity
{
    public class IdentitServerSetting
    {
        public string ClientId { get; set; }
        public string Secret { get; set; }
        public string Audience { get; set; }
    }
}
