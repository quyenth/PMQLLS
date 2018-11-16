using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entity
{
    public class Xa
    {


                    public Int32 XaId { get; set; }
                
                    public string MaXa { get; set; }
                
                    public string TenXa { get; set; }
                
                    public Int32? HuyenId { get; set; }
                
                    public string MaDiaChi { get; set; }
                
                    public Int32? Type { get; set; }
                
                    public Boolean? Active { get; set; }
                
                    public Boolean? Is1990 { get; set; }
                 
    }
}
