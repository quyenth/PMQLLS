using CodeGen.Data.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CodeGen.Data
{
    public class ExtractDB
    {

        public bool CheckConnection()
        {
            using (SqlConnection con = new SqlConnection(ConfigData.ConnectionString))
            {

                try
                {
                    con.Open();
                    return true;
                }
                catch (Exception ex)
                {

                    return false;
                }
            }
        }
        public List<string> GetTablesName(string dbName)
        {
            var result = new List<string>();
            var sqlCommandString = @"SELECT TABLE_NAME
                                    FROM INFORMATION_SCHEMA.TABLES
                                    WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG=@DBName";
            var queryResult = Sqlhelper.ExecDataTable(sqlCommandString, CommandType.Text, new SqlParameter[] { new SqlParameter("@DBName", dbName) });
            result = queryResult.AsEnumerable().Select(c => c["TABLE_NAME"].ToString()).ToList();
            return result;
        }

        public List<ColumnInfo> GetColumnsByTable(string tableName)
        {

            var sqlCommandString = @"select COLUMN_NAME as ColumnName, DATA_TYPE as DataType, CHARACTER_MAXIMUM_LENGTH as [MaxLength],      
                                      CONVERT(bit, (CASE IS_NULLABLE
														WHEN 'Yes' THEN 1
														WHEN 'No' THEN 0
													END)
													 ) as IsNullable 
                                    from INFORMATION_SCHEMA.COLUMNS
                                    where TABLE_NAME=@TableName";
            var queryResult = Sqlhelper.ExecDataTable(sqlCommandString, CommandType.Text, new SqlParameter[] { new SqlParameter("@TableName", tableName) });
            var result = queryResult.ToList<ColumnInfo>();
            return result;
        }

        public string GetPrimaryKey(string tableName)
        {
            var sqlCommandString = @"SELECT 
                                        c.name AS column_name,
                                        i.name AS index_name,
                                        c.is_identity
                                    FROM sys.indexes i
                                        inner join sys.index_columns ic  ON i.object_id = ic.object_id AND i.index_id = ic.index_id
                                        inner join sys.columns c ON ic.object_id = c.object_id AND c.column_id = ic.column_id
                                    WHERE i.is_primary_key = 1
                                        and i.object_ID = OBJECT_ID(@TableName);";
            var queryResult = Sqlhelper.ExecDataTable(sqlCommandString, CommandType.Text, new SqlParameter[] { new SqlParameter("@TableName", tableName) });
            var result = queryResult.AsEnumerable().Select(c => c["column_name"].ToString()).FirstOrDefault();
            return result;
           
        }

        public TableInfo GetTableInfo(string tableName)
        {
            var primarykey = GetPrimaryKey(tableName);
            var result = new TableInfo()
            {
                TableName = tableName,
                PrimaryKey = primarykey
            };

            result.ColumnInfos = GetColumnsByTable(tableName);
            return result;
        }
    }
}
