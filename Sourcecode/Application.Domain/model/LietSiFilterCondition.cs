using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCore.Data
{
    public class LietSiFilterCondition
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }

        public LietsiSearchCondition searchCodition { get; set; }

    }
}
