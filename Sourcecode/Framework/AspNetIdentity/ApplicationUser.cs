using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Framework.AspNetIdentity
{
    public partial class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public ICollection<ApplicationUserRole> UserRoles { get; set; }
    }
}
