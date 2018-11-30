using CodeGen.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CodeGen.UI
{
    public partial class Config : Form
    {
        public ExtractDB db = new ExtractDB();
        public Config()
        {
            InitializeComponent();
            txtServerName.Text = ConfigData.ServerName;
            txtDbName.Text = ConfigData.DBName;
            txtUserID.Text = ConfigData.UserID;
            txtPassword.Text = ConfigData.Password;
        }

        private void txtOK_Click(object sender, EventArgs e)
        {
            ConfigData.ServerName = txtServerName.Text;
            ConfigData.DBName = txtDbName.Text;
            ConfigData.UserID = txtUserID.Text;
            ConfigData.Password = txtPassword.Text;
            if (!db.CheckConnection())
            {
                MessageBox.Show("Thông tin db không chính xác, hãy nhập lại");

            }
            else
            {
                ActionForm actionForm = new ActionForm();
                actionForm.Show();
                this.Hide();
            }
        }
    }
}
