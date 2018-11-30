using CodeGen.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CodeGen.Data
{
    public class Sqlhelper
    {
        /// <summary>
        /// Execute store procedure return dataset
        /// </summary>
        /// <param name="procName"></param>
        /// <param name="commandType"></param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static DataSet ExecDataSet(string procName, CommandType commandType = CommandType.StoredProcedure, object[] paramaters = null)
        {


            DataSet dtSet = new DataSet();
            using (SqlConnection sqlConn = new SqlConnection(ConfigData.ConnectionString))
            {
                SqlCommand command = new SqlCommand(procName, sqlConn);
                SqlDataAdapter adapter = new SqlDataAdapter(command);
                using (command)
                {
                    command.CommandType = commandType;
                    if (paramaters != null)
                    {
                        foreach (var para in paramaters)
                        {
                            command.Parameters.Add(para);
                        }
                    }

                    adapter.Fill(dtSet);
                }
                return dtSet;
            }
        }

        /// <summary>
        /// exec nonquery using for insert, update, delete
        /// </summary>
        /// <param name="sqlCommand"> </param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static int ExecCommand(string sqlCommand, object[] paramaters = null)
        {

            using (SqlConnection sqlConn = new SqlConnection(ConfigData.ConnectionString))
            {
                SqlCommand command = new SqlCommand(sqlCommand, sqlConn);
                using (command)
                {
                    command.CommandType = CommandType.Text;
                    if (paramaters != null)
                    {
                        foreach (var para in paramaters)
                        {
                            command.Parameters.Add(para);
                        }
                    }
                    var result = command.ExecuteNonQuery();
                    return result;

                }
            }


        }


        /// <summary>
        /// Execute procedure return datatable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="procName"></param>
        /// <param name="commandType"></param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static DataTable ExecDataTable(string procName, CommandType commandType = CommandType.StoredProcedure, Object[] paramaters = null)
        {
            try
            {
                var dataSet = ExecDataSet(procName, commandType, paramaters);
                return dataSet.Tables[0];
            }
            catch (Exception ex)
            {

                throw ;
                // return new DataTable();

            }
        }

        /// <summary>
        /// Exec procedure return entity
        /// </summary>
        /// <typeparam name="K"></typeparam>
        /// <typeparam name="T"></typeparam>
        /// <param name="procName"></param>
        /// <param name="commandType"></param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static IList<T> ExecEntity<T>(string procName, CommandType commandType = CommandType.StoredProcedure, Object[] paramaters = null)
            where T : new()
        {
            DataTable tb = ExecDataTable(procName, commandType, paramaters);
            return tb.ToList<T>();
        }
    }
}