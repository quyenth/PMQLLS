using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entity
{
    public class AccessHistory
    {


                    public Int32 Id { get; set; }
                
                    public string Account { get; set; }
                
                    public string FullName { get; set; }
                
                    public DateTime? AccessTime { get; set; }
                
                    public string IPAddress { get; set; }
                 
    }
}
