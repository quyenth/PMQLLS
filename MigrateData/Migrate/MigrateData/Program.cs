using MigrateData.Data;
using Spire.Doc;
using Spire.Doc.Documents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MigrateData
{
    class Program
    {
        static void Main(string[] args)
        {
            ReadFile();
        }
        public static void ReadFile()
        {
            Document document = new Document(@"C:\Working\QLTBLS\Doc\DS LS DA GUI CAC TINH\DS LIỆT SĨ- HÀ NAM.doc", FileFormat.Doc);
            //  document.EmbedFontsInFile=""
            //Set Font Style and Size
            using (var context = new LietsiEntities())
            {
                foreach (Spire.Doc.TableRow row in document.Sections[0].Tables[0].Rows)
                {
                    if (row.Cells.Count == 9)
                    {
                        if (row.Cells[0].Paragraphs[0].Text=="STT")
                        {
                            continue;
                        }
                        Thongtinlietsi lietsi = new Thongtinlietsi();
                        if (row.Cells[1].Paragraphs.Count>0)
                        {
                            lietsi.Hoten = row.Cells[1].Paragraphs[0].Text;
                        }
                        if (row.Cells[1].Paragraphs.Count > 1)
                        {
                            lietsi.Namsinh = row.Cells[1].Paragraphs[1].Text;
                        }


                        if (row.Cells[2].Paragraphs.Count > 0)
                        {
                            lietsi.Quequan = row.Cells[2].Paragraphs[0].Text;
                        }
                        if (row.Cells[2].Paragraphs.Count > 1)
                        {
                            lietsi.Truquan = row.Cells[2].Paragraphs[1].Text;
                        }

                        if (row.Cells[3].Paragraphs.Count > 0)
                        {
                            lietsi.Ngaynhapngu = row.Cells[3].Paragraphs[0].Text;
                        }


                        if (row.Cells[4].Paragraphs.Count > 0)
                        {
                            lietsi.Donvi = row.Cells[4].Paragraphs[0].Text;
                        }
                        if (row.Cells[4].Paragraphs.Count > 1)
                        {
                            lietsi.Capbac = row.Cells[4].Paragraphs[1].Text;
                        }
                        if (row.Cells[4].Paragraphs.Count > 2)
                        {
                            lietsi.Chucvu = row.Cells[4].Paragraphs[2].Text;
                        }


                        if (row.Cells[5].Paragraphs.Count > 0)
                        {
                            lietsi.Ngayhisinh = row.Cells[5].Paragraphs[0].Text;
                        }
                        if (row.Cells[5].Paragraphs.Count > 1)
                        {
                            lietsi.Truonghophisinh = row.Cells[5].Paragraphs[1].Text;
                        }

                        var noimaitang = new List<string>();
                        for (int i = 0; i < row.Cells[6].Count; i++)
                        {
                            noimaitang.Add(row.Cells[6].Paragraphs[i].Text);
                        }
                        lietsi.Noimaitang = string.Join(" - ", noimaitang);

                        var thanhnhan = new List<string>();
                        for (int i = 0; i < row.Cells[7].Count; i++)
                        {
                            thanhnhan.Add(row.Cells[7].Paragraphs[i].Text);
                        }
                        lietsi.Thannhan = string.Join(" - ", thanhnhan);


                        if (row.Cells[8].Paragraphs.Count > 0)
                        {
                            lietsi.Tennghiatrang = row.Cells[8].Paragraphs[0].Text;
                        }
                        if (row.Cells[8].Paragraphs.Count > 1)
                        {
                            lietsi.Somo = row.Cells[8].Paragraphs[1].Text;
                        }
                        context.Thongtinlietsis.Add(lietsi);
                        context.SaveChanges();
                    }else if(row.Cells.Count == 10)
                    {
                        Thongtinlietsi lietsi = new Thongtinlietsi();
                        if (row.Cells[1].Paragraphs.Count > 0)
                        {
                            lietsi.Hoten = row.Cells[1].Paragraphs[0].Text;
                        }
                        if (row.Cells[2].Paragraphs.Count > 0)
                        {
                            lietsi.Namsinh = row.Cells[2].Paragraphs[0].Text;
                        }


                        if (row.Cells[3].Paragraphs.Count > 0)
                        {
                            lietsi.Quequan = row.Cells[3].Paragraphs[0].Text;
                        }
                        if (row.Cells[3].Paragraphs.Count > 1)
                        {
                            lietsi.Truquan = row.Cells[3].Paragraphs[1].Text;
                        }

                        if (row.Cells[4].Paragraphs.Count > 0)
                        {
                            lietsi.Ngaynhapngu = row.Cells[4].Paragraphs[0].Text;
                        }


                        if (row.Cells[5].Paragraphs.Count > 0)
                        {
                            lietsi.Donvi = row.Cells[5].Paragraphs[0].Text;
                        }
                        if (row.Cells[5].Paragraphs.Count > 1)
                        {
                            lietsi.Capbac = row.Cells[5].Paragraphs[1].Text;
                        }
                        if (row.Cells[5].Paragraphs.Count > 2)
                        {
                            lietsi.Chucvu = row.Cells[5].Paragraphs[2].Text;
                        }


                        if (row.Cells[6].Paragraphs.Count > 0)
                        {
                            lietsi.Ngayhisinh = row.Cells[6].Paragraphs[0].Text;
                        }
                        if (row.Cells[6].Paragraphs.Count > 1)
                        {
                            lietsi.Truonghophisinh = row.Cells[6].Paragraphs[1].Text;
                        }

                        var noimaitang = new List<string>();
                        for (int i = 0; i < row.Cells[7].Count; i++)
                        {
                            noimaitang.Add(row.Cells[7].Paragraphs[i].Text);
                        }
                        lietsi.Noimaitang = string.Join(" - ", noimaitang);

                        var thanhnhan = new List<string>();
                        for (int i = 0; i < row.Cells[8].Count; i++)
                        {
                            thanhnhan.Add(row.Cells[8].Paragraphs[i].Text);
                        }
                        lietsi.Thannhan = string.Join(" - ", thanhnhan);


                        if (row.Cells[9].Paragraphs.Count > 0)
                        {
                            lietsi.Tennghiatrang = row.Cells[9].Paragraphs[0].Text;
                        }
                        if (row.Cells[9].Paragraphs.Count > 1)
                        {
                            lietsi.Somo = row.Cells[9].Paragraphs[1].Text;
                        }
                        context.Thongtinlietsis.Add(lietsi);
                        context.SaveChanges();
                    }
                }
            }
            

          //  var k =    document.Sections[0];
        }
    }
}
