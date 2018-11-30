using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CodeGen.Data.Utils;
namespace CodeGen.Data.Entity
{
    public class ColumnInfo
    {
        public string ColumnName { get; set; }
        public string ColumnNameCamel
        {
            get
            {
                return ColumnName.ToCamelCase();
            }
        }
        public string DataType { get; set; }
        public string CodeDataType
        {
            get
            {
                var result = string.Empty;
                if (DataType == "money" || DataType == "float")
                {
                    result = "double";
                }
                else if (DataType == "bigint")
                {
                    result = "Int64";
                }
                else if (DataType == "int")
                {
                    result = "Int32";
                }
                else if ((DataType == "datetime" || DataType == "date"))
                {
                    result = "DateTime";
                }
                else if (DataType == "varchar" || DataType == "nvarchar" || DataType == "text" || DataType == "ntext")
                {
                    result = "string";
                }
                else if (DataType == "bit")
                {
                    result = "Boolean";
                }
                return result;

            }
        }
        public string DataTypeForCode
        {
            get
            {
                if (CodeDataType == "string")
                {
                    return CodeDataType;
                }
                else
                    return CodeDataType + ((IsNullable == true) ? "?" : string.Empty);
            }
        }
        public int? MaxLength { get; set; }
        public bool IsNullable { get; set; }
        public bool IsDateTime
        {
            get
            {


                return (DataType == "datetime" || DataType == "date");

            }
        }
        public bool IsString
        {
            get
            {

                return (DataType == "varchar" || DataType == "nvarchar" || DataType == "text" || DataType == "ntext");
            }
        }
        public bool IsBoolean
        {
            get
            {

                return (DataType == "bit");
            }
        }
        public bool IsNumber
        {

            get
            {

                return (DataType == "money" || DataType == "bigint" || DataType == "float" || DataType == "int");
            }
        }

        public bool isInputText
        {
            get
            {
                return (IsString && MaxLength != null && MaxLength <= 400 && MaxLength!=-1);
            }
             
        }
        public bool isTextArea
        {
            get
            {
                return (IsString && MaxLength != null && MaxLength > 400 && MaxLength<500);
            }

        }
        public bool isHtmlEditor
        {
            get
            {
                return (IsString && MaxLength != null && MaxLength==-1);
            }

        }
    }
}
