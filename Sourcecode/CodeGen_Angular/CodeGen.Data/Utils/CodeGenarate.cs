using CodeGen.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Antlr.StringTemplate;
namespace CodeGen.Data.Utils
{
    public class CodeGenarate
    {
        public static bool Save(TableInfo tableInfo, GenInfo info)
        {
            try
            {
                if (File.Exists(info.TemplateFile))
                {
                    using (StreamReader reader = new StreamReader(info.TemplateFile))
                    {

                        var templateData = reader.ReadToEnd();
                        var template = new StringTemplate(templateData);
                                   
                        template.SetAttribute("config", info);
                        template.SetAttribute("item", tableInfo);
                        var fileName = string.Empty;
                        var fileNameSplit = info.TemplateFile.Split(new string[] { "." }, StringSplitOptions.RemoveEmptyEntries).ToList();
                        //if (info.TemplateFile.EndsWith("template") && fileNameSplit.Count>3)
                        //{
                        //    fileName = (string.IsNullOrEmpty(info.Prifix) ? string.Empty : info.Prifix) + tableInfo.TableName + (string.IsNullOrWhiteSpace(info.Suffix) ? "." : (info.Suffix + ".")) + fileNameSplit[fileNameSplit.Count - 2];
                        //}
                        //else
                        //{
                        //    fileName = (string.IsNullOrEmpty(info.Prifix)?string.Empty: info.Prifix) + tableInfo.TableName + (string.IsNullOrWhiteSpace(info.Suffix) ? "." : (info.Suffix + ".")) + fileNameSplit.Last();
                        //}
                        if (!Directory.Exists(info.Folder))
                        {
                            Directory.CreateDirectory(info.Folder);
                        }
                       File.WriteAllText(  Path.Combine(info.Folder, fileName), template.ToString());
                    }
                }
            }
            catch (Exception ex)
            {

                return false;   
            }
            return true;
        }

        public static bool SaveFile(TableInfo tableInfo, GenInfo info)
        {
            try
            {
                if (File.Exists(info.TemplateFile))
                {
                    using (StreamReader reader = new StreamReader(info.TemplateFile))
                    {
                        var folderPath = Path.Combine(info.Folder, tableInfo.TableNameLowerCase) + info.FolderStructure;
                        folderPath = folderPath.Replace("$table$", tableInfo.TableNameLowerCase);
                        var templateData = reader.ReadToEnd();
                        var template = new StringTemplate(templateData);

                        template.SetAttribute("config", info);
                        template.SetAttribute("item", tableInfo);
                        var fileName =Path.GetFileName( info.TemplateFile).Replace("$table$", tableInfo.TableNameLowerCase).Replace(".template","");

                        if (!Directory.Exists(folderPath))
                        {
                            Directory.CreateDirectory(folderPath);
                        }
                        File.WriteAllText(Path.Combine(folderPath, fileName), template.ToString());
                    }
                }
            }
            catch (Exception ex)
            {

                return false;
            }
            return true;
        }
    }
}
