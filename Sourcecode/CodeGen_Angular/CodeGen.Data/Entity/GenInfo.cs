using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeGen.Data.Entity
{
    public class GenInfo
    {
        public string GenType { get; set; }//model, controller, js, view...
        public string Folder { get; set; }//folder path
        public string ControllerNameSpace { get; set; }//namespace for genclass
        public string ServiceNameSpace { get; set; }//namespace for genclass
        public string ModelNameSpace { get; set; }//namespace for genclass
        public string NameSpace { get; set; }//namespace for genclass
        public string TemplateFile { get; set; }//path to template file
        public string Module { get; set; }
        public string DBContext { get; set; }
        public string FolderStructure { get; set; }
    }
}
