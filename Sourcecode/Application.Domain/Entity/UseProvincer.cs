using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Domain.Entity
{
    public class UseProvincer
    {
        public int Id { set; get; }

        public string UserId { set; get; }

        public string RoleId { set; get; }

        public int ProvincerId { set; get; }
    }
}
