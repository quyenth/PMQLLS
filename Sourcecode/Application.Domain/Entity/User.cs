using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entity
{
    public class User
    {


                    public Int32 UserId { get; set; }
                
                    public string Account { get; set; }
                
                    public string Password { get; set; }
                
                    public string FullName { get; set; }
                
                    public string Email { get; set; }
                
                    public string Note { get; set; }
                
                    public Boolean? Active { get; set; }
                 
    }
}
