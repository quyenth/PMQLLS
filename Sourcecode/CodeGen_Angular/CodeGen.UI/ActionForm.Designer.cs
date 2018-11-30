namespace CodeGen.UI
{
    partial class ActionForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.cklTableName = new System.Windows.Forms.CheckedListBox();
            this.label1 = new System.Windows.Forms.Label();
            this.txtGencode = new System.Windows.Forms.Button();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.folderBrowserDialog1 = new System.Windows.Forms.FolderBrowserDialog();
            this.btnBrowseTemplateFolder = new System.Windows.Forms.Button();
            this.txtTemplate = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.btnBrowseSaveFolder = new System.Windows.Forms.Button();
            this.txtSaveFolder = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // cklTableName
            // 
            this.cklTableName.FormattingEnabled = true;
            this.cklTableName.Location = new System.Drawing.Point(43, 60);
            this.cklTableName.Margin = new System.Windows.Forms.Padding(4);
            this.cklTableName.Name = "cklTableName";
            this.cklTableName.Size = new System.Drawing.Size(240, 293);
            this.cklTableName.TabIndex = 0;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(39, 30);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(76, 17);
            this.label1.TabIndex = 1;
            this.label1.Text = "Chọn table";
            // 
            // txtGencode
            // 
            this.txtGencode.Location = new System.Drawing.Point(753, 389);
            this.txtGencode.Margin = new System.Windows.Forms.Padding(4);
            this.txtGencode.Name = "txtGencode";
            this.txtGencode.Size = new System.Drawing.Size(100, 28);
            this.txtGencode.TabIndex = 3;
            this.txtGencode.Text = "Gencode";
            this.txtGencode.UseVisualStyleBackColor = true;
            this.txtGencode.Click += new System.EventHandler(this.txtGencode_Click);
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // btnBrowseTemplateFolder
            // 
            this.btnBrowseTemplateFolder.Location = new System.Drawing.Point(741, 76);
            this.btnBrowseTemplateFolder.Margin = new System.Windows.Forms.Padding(4);
            this.btnBrowseTemplateFolder.Name = "btnBrowseTemplateFolder";
            this.btnBrowseTemplateFolder.Size = new System.Drawing.Size(100, 28);
            this.btnBrowseTemplateFolder.TabIndex = 10;
            this.btnBrowseTemplateFolder.Text = "Browse";
            this.btnBrowseTemplateFolder.UseVisualStyleBackColor = true;
            this.btnBrowseTemplateFolder.Click += new System.EventHandler(this.btnBrowseTemplateFolder_Click);
            // 
            // txtTemplate
            // 
            this.txtTemplate.Location = new System.Drawing.Point(436, 79);
            this.txtTemplate.Margin = new System.Windows.Forms.Padding(4);
            this.txtTemplate.Name = "txtTemplate";
            this.txtTemplate.Size = new System.Drawing.Size(297, 22);
            this.txtTemplate.TabIndex = 9;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(310, 82);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(107, 17);
            this.label3.TabIndex = 8;
            this.label3.Text = "Template folder";
            // 
            // btnBrowseSaveFolder
            // 
            this.btnBrowseSaveFolder.Location = new System.Drawing.Point(741, 133);
            this.btnBrowseSaveFolder.Margin = new System.Windows.Forms.Padding(4);
            this.btnBrowseSaveFolder.Name = "btnBrowseSaveFolder";
            this.btnBrowseSaveFolder.Size = new System.Drawing.Size(100, 28);
            this.btnBrowseSaveFolder.TabIndex = 13;
            this.btnBrowseSaveFolder.Text = "Browse";
            this.btnBrowseSaveFolder.UseVisualStyleBackColor = true;
            this.btnBrowseSaveFolder.Click += new System.EventHandler(this.btnBrowseSaveFolder_Click_1);
            // 
            // txtSaveFolder
            // 
            this.txtSaveFolder.Location = new System.Drawing.Point(436, 136);
            this.txtSaveFolder.Margin = new System.Windows.Forms.Padding(4);
            this.txtSaveFolder.Name = "txtSaveFolder";
            this.txtSaveFolder.Size = new System.Drawing.Size(297, 22);
            this.txtSaveFolder.TabIndex = 12;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(310, 139);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(80, 17);
            this.label2.TabIndex = 11;
            this.label2.Text = "Save folder";
            // 
            // ActionForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(869, 432);
            this.Controls.Add(this.btnBrowseSaveFolder);
            this.Controls.Add(this.txtSaveFolder);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.btnBrowseTemplateFolder);
            this.Controls.Add(this.txtTemplate);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.txtGencode);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.cklTableName);
            this.Margin = new System.Windows.Forms.Padding(4);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "ActionForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "ActionForm";
            this.Load += new System.EventHandler(this.ActionForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.CheckedListBox cklTableName;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button txtGencode;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.FolderBrowserDialog folderBrowserDialog1;
        private System.Windows.Forms.Button btnBrowseTemplateFolder;
        private System.Windows.Forms.TextBox txtTemplate;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btnBrowseSaveFolder;
        private System.Windows.Forms.TextBox txtSaveFolder;
        private System.Windows.Forms.Label label2;
    }
}