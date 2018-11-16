using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entity
{
    public class Huyen
    {


                    public Int32 HuyenId { get; set; }
                
                    public string MaHuyen { get; set; }
                
                    public string TenHuyen { get; set; }
                
                    public Int32? TinhId { get; set; }
                
                    public Int32? Type { get; set; }
                
                    public Boolean? Active { get; set; }
                
                    public Boolean? Is1990 { get; set; }
                 
    }
}
