using System;
using System.Collections.Generic;
using System.Text;

namespace Framework.AspNetIdentity
{
    public class RegisterModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }

        public string FullName { get; set; }
    }
}
