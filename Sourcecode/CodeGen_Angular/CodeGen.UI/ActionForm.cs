using CodeGen.Data;
using CodeGen.Data.Entity;
using CodeGen.Data.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CodeGen.UI
{
    public partial class ActionForm : Form
    {
        public ActionForm()
        {
            InitializeComponent();
        }

        private void ActionForm_Load(object sender, EventArgs e)
        {
            ExtractDB db = new ExtractDB();
            var tables = db.GetTablesName(ConfigData.DBName);
            ((ListBox)cklTableName).DataSource = tables;

            //list action
            List<string> actions = new List<string>(){
                "Gen model",
                "Gen Controller",
                "Gen view"
            };

            txtTemplate.Text = System.Configuration.ConfigurationManager.AppSettings["TemplateFolder"];
            txtSaveFolder.Text = System.Configuration.ConfigurationManager.AppSettings["SaveFolder"];

            //add item to comboBox


        }

        private void txtGencode_Click(object sender, EventArgs e)
        {
            var tableNames = new List<string>();
            var actionNames = new List<string>();

            if (cklTableName.CheckedItems.Count == 0)
            {
                MessageBox.Show("Hãy chọn table");
                return;
            }

            var templateFolder = txtTemplate.Text;
            var saveFolder = txtSaveFolder.Text;
            if (!Directory.Exists(templateFolder))
            {
                MessageBox.Show("Hãy chọn thư mục template!");
                return;
            }
            if (!Directory.Exists(saveFolder))
            {
                MessageBox.Show("Hãy chọn thư mục lưu kết quả!");
                return;
            }

            //get all template in template folder
            var templates = Directory.GetFiles(templateFolder, "*.template", SearchOption.AllDirectories);



            var genInfors = GetTemplateInfo(saveFolder, templates, templateFolder);
            foreach (var item in cklTableName.CheckedItems)
            {
                tableNames.Add(item.ToString());
                var columnsInfos = new ExtractDB().GetColumnsByTable(item.ToString());
                TableInfo tb = new TableInfo()
                {
                    TableName = item.ToString(),
                    ColumnInfos = columnsInfos
                };
                tb.PrimaryKey = new ExtractDB().GetPrimaryKey(item.ToString());
                foreach (var genInfo in genInfors)
                {
                    CodeGenarate.SaveFile(tb, genInfo);
                }

            }
            MessageBox.Show("Generate finish!");


        }

        public List<GenInfo> GetTemplateInfo(string saveFolder, string[] templates, string templateRootPath = "")
        {
            var result = new List<GenInfo>();
            var folder = System.Configuration.ConfigurationManager.AppSettings["SaveFolder"];
            var module = System.Configuration.ConfigurationManager.AppSettings["Module"];
            //controller
            foreach (var item in templates)
            {

                result.Add(new GenInfo()
                {
                    FolderStructure = Path.GetDirectoryName(item).Replace(templateRootPath, ""),
                    Folder = saveFolder,
                    ControllerNameSpace = System.Configuration.ConfigurationManager.AppSettings["Controller_NameSpace"],
                    ServiceNameSpace = System.Configuration.ConfigurationManager.AppSettings["Service_NameSpace"],
                    NameSpace = System.Configuration.ConfigurationManager.AppSettings["NameSpace"],
                    TemplateFile = item,
                    Module = module,
                    DBContext = System.Configuration.ConfigurationManager.AppSettings["DBContext"]
                });
            }


            return result;
        }


        private void btnBrowseSaveFolder_Click(object sender, EventArgs e)
        {
            var fbd = new FolderBrowserDialog();
            DialogResult result = fbd.ShowDialog();

            if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
            {
                txtSaveFolder.Text = fbd.SelectedPath;
            }
        }

        private void btnBrowseTemplateFolder_Click(object sender, EventArgs e)
        {
            var fbd = new FolderBrowserDialog();
            DialogResult result = fbd.ShowDialog();

            if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
            {
                txtTemplate.Text = fbd.SelectedPath;
            }
        }

        private void btnBrowseSaveFolder_Click_1(object sender, EventArgs e)
        {
            var fbd = new FolderBrowserDialog();
            DialogResult result = fbd.ShowDialog();

            if (result == DialogResult.OK && !string.IsNullOrWhiteSpace(fbd.SelectedPath))
            {
                txtSaveFolder.Text = fbd.SelectedPath;
            }
        }


    }
    public class ComboBoxItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
    }
}
