using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Framework.Common
{
    public class Sqlhelper        
    {
        /// <summary>
        /// Execute store procedure return dataset
        /// </summary>
        /// <param name="context"></param>
        /// <param name="procName"></param>
        /// <param name="commandType"></param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static DataSet ExecDataSet(DbContext context , string procName, CommandType commandType = CommandType.StoredProcedure, object[] paramaters = null)
        {            
                DataSet dtSet = new DataSet();
                SqlConnection sqlConn = (SqlConnection)context.Database.GetDbConnection();
                SqlCommand command = new SqlCommand(procName, sqlConn);
                SqlDataAdapter adapter = new SqlDataAdapter(command);
                using (command)
                {
                    command.CommandType = commandType;
                    if (paramaters!= null)
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

        /// <summary>
        /// exec nonquery using for insert, update, delete
        /// </summary>
        /// <param name="context"></param>
        /// <param name="sqlCommand"> </param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static int ExecCommand(DbContext context , string sqlCommand, object[] paramaters = null){
            
                SqlConnection sqlConn = (SqlConnection)context.Database.GetDbConnection();
                SqlCommand command = new SqlCommand(sqlCommand, sqlConn);
                using (command)
                {
                    sqlConn.Open();
                    command.CommandType = CommandType.Text;
                    if (paramaters!= null)
                    {
                        foreach (var para in paramaters)
                        {
                            command.Parameters.Add(para);
                        }
                    }
                   var result =  command.ExecuteNonQuery();
                   return result;
                
                }               
            
        }
        /// <summary>
        /// exec nonquery using for insert, update, delete
        /// </summary>
        /// <param name="context"></param>
        /// <param name="sqlCommand"> </param>
        /// <param name="commandType"></param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static int ExecCommandProc(DbContext context,  string sqlCommand,CommandType commandType, object[] paramaters = null)
        {
            
                SqlConnection sqlConn = (SqlConnection)context.Database.GetDbConnection();
                SqlCommand command = new SqlCommand(sqlCommand, sqlConn);
                using (command)
                {
                    sqlConn.Open();
                    command.CommandType = commandType;
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

        /// <summary>
        /// Execute procedure return datatable
        /// </summary>
        /// <param name="context"></param>
        /// <param name="procName"></param>
        /// <param name="commandType"></param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static DataTable ExecDataTable(DbContext context, string procName, CommandType commandType = CommandType.StoredProcedure, Object[] paramaters = null)
        {
            try
            {
                var dataSet = ExecDataSet(context ,procName, commandType, paramaters);
                return dataSet.Tables[0];
            }
            catch (Exception ex)
            {
                //Logger.Instance.Error("ExecDataTable error", ex);
                throw ex;
                // return new DataTable();

            }
        }

        /// <summary>
        /// Exec procedure return entity
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="context"></param>
        /// <param name="procName"></param>
        /// <param name="commandType"></param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static IList<T> ExecEntity<T>(DbContext context, string procName, CommandType commandType = CommandType.StoredProcedure, Object[] paramaters = null)
            where T : new()            
        {
            DataTable tb = ExecDataTable(context , procName, commandType, paramaters);
            return tb.ToList<T>();
        }

        /// <summary>
        /// Execute query return int
        /// </summary>
        /// <param name="context"></param>
        /// <param name="sqlCommand"></param>
        /// <param name="paramaters"></param>
        /// <returns></returns>
        public static object ExecScalar(DbContext context, string sqlCommand, object[] paramaters = null)
        {
            
                SqlConnection sqlConn = (SqlConnection)context.Database.GetDbConnection();
                var result = new object();
                try
                {
                    sqlConn.Open();
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
                        result = command.ExecuteScalar();
                    }
                    
                }
                catch (Exception ex)
                {
                    //Logger.Instance.Error("ExecScalar error", ex);
                    
                }
                finally
                {
                    sqlConn.Close();
                }
                return result;
            }
        
    }
}