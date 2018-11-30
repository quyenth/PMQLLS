using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeGen.Data.Utils;
namespace CodeGen.Data.Entity
{
    public class TableInfo
    {
        public string TableName { get; set; }
        public string PrimaryKey { get; set; }
        public string PrimaryKeyCamel
        {
            get { return PrimaryKey.ToCamelCase(); }
        }

        public string TableNameLowerCase
        {
            get { return TableName.ToLower(); }
        }
        public string TableNameCamel
        {
            get { return TableName.ToCamelCase(); }
        }
        public List<ColumnInfo> ColumnInfos { get; set; }

    }
}
