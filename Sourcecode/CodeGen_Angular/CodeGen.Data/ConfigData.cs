using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeGen.Data
{
    public class ConfigData
    {

        public static string ServerName = System.Configuration.ConfigurationSettings.AppSettings["ServerName"];
        public static string DBName = System.Configuration.ConfigurationSettings.AppSettings["DBName"];
        public static string UserID = System.Configuration.ConfigurationSettings.AppSettings["UserID"];
        public static string Password = System.Configuration.ConfigurationSettings.AppSettings["Password"];
        public static string ConnectionString
        {
            //get { return string.Format("Server={0};Database={1};User Id={2};Password={3};", ServerName, DBName, UserID, Password); }
            get
            {
                return System.Configuration.ConfigurationSettings.AppSettings["ConnectionString"];
            }

        }//= 
    }
}
