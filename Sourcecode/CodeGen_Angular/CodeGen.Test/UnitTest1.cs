using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using CodeGen.Data;

namespace CodeGen.Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            ExtractDB db = new ExtractDB();
            var tables = db.GetTablesName("NEWPAO_DEV");
            foreach (var item in tables)
            {
                Console.WriteLine(item);    
            }
            
        }

        [TestMethod]
        public void TestGetColumnInfo()
        {
            ExtractDB db = new ExtractDB();
            var tables = db.GetColumnsByTable("Requestes");
            foreach (var item in tables)
            {
                Console.WriteLine(item.ColumnName);
            }

        }
    }
}
