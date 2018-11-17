using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entity
{
    public class Tinh
    {


                    public Int32 TinhId { get; set; }
                
                    public string MaTinh { get; set; }
                
                    public string TenTinh { get; set; }
                
                    public Int32? Type { get; set; }
                
                    public Boolean? Active { get; set; }
                
                    public Boolean? Is1990 { get; set; }
                
                    public string GhiChu { get; set; }
                 
    }
}
