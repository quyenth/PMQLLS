using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Domain.Entity;
using Application.Domain.Services;
using AspNetCore.Data;
using Framework.AspNetIdentity;
using Framework.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Data;
using Aspose.Words;
using Aspose.Words.Tables;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using Microsoft.AspNetCore.Hosting;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/LietSy/[action]")]
    //[Authorize(AuthenticationSchemes = AuthenticationSchemes.Bearer)]
    [Authorize]
    public class LietSyController : ControllerBase
    {
        private ILietSyService lietSyService;

        private readonly UserManager<ApplicationUser> userManager;
        private IHostingEnvironment _hostingEnvironment;

        public LietSyController (ILietSyService lietSyService , UserManager<ApplicationUser> userManager, IHostingEnvironment hostingEnvironment)
        {
            this.lietSyService = lietSyService;
            this.userManager = userManager;
            this._hostingEnvironment = hostingEnvironment;

        }
        /// <summary>
        /// save lietSy
        /// </summary>
        /// <param name="model"></param>
        /// <remarks>
        /// if Id = 0 => add else update
        /// </remarks>
        /// <returns></returns>
        [HttpPost]
        public async Task<ApiResult> Save([FromBody] LietSy model)
        {
            var user = HttpContext.User;
            var userId = userManager.GetUserId(User);

            if (model.Id == 0)
            {               
                model.Created = DateTime.Now;
                model.Updated = DateTime.Now;
                model.CreatdedBy = userId;
                model.UpdatedBy = userId;
                var added = lietSyService.Add(model);
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = added
                };
            }
            //edit
            else
            {
                model.Updated = DateTime.Now;
                lietSyService.Update(model);
                model.UpdatedBy = userId;
                return new ApiResult()
                {
                    Status = HttpStatus.OK,
                    Data = model
                };
            }
        }
        /// <summary>
        /// get list LietSy
        /// </summary>
        /// <param name="filterCondition"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> Search([FromBody]LietSiFilterCondition filterCondition)
        {
            var listOfStrings = new List<string>();
            PagingInfo paging = new PagingInfo
                                {
                                    PageIndex = filterCondition.PageIndex,
                                    PageSize = filterCondition.PageSize
                                };
            var result = lietSyService.SearchListLietSi(filterCondition.searchCodition, paging);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = new
                {
                    Total = paging.TotalCount,
                    List = result
                }
            };
        }
        /// <summary>
        /// get LietSy by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}")]
        public async Task<ApiResult> GetById(int id)
        {
            var result = lietSyService.Find(id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = result
            };
        }

        /// <summary>
        /// Delete 1 bản ghi
        /// </summary>
        /// <param name="model">LietSy entity</param>
        /// <returns></returns>

        [HttpPost]
        public async Task< ApiResult> Delete([FromBody] LietSy model)
        {
            lietSyService.Delete(c => c.Id == model.Id);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = model.Id
            };
        }
        /// <summary>
        /// delete list LietSy
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> DeleteList([FromBody]List<LietSy> items)
        {
            var ids = items.Select(item => item.Id).ToList();
            lietSyService.Delete(c => ids.Contains(c.Id));
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }
        /// <summary>
        /// add list lietSy
        /// </summary>
        /// <param name="items"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task< ApiResult> AddList([FromBody]List<LietSy> items)
        {
            lietSyService.Add(items);
            return new ApiResult()
            {
                Status = HttpStatus.OK,
                Data = null
            };
        }

        [HttpPost]
        public IActionResult ExportListLietSi ([FromBody]LietsiSearchCondition searhData)
        {
            //MemoryStream ms = new MemoryStream();
            //Document doc = new Document();
            //DocumentBuilder builder = new DocumentBuilder(doc);

            //var data = lietSyService.ExportListLietSi(searhData);

            //builder.ParagraphFormat.Alignment = ParagraphAlignment.Center;
            //Aspose.Words.Font font = builder.Font;
            //font.Size = 16;
            //font.Bold = true;
            //font.Name = "Times New Roman";
            //builder.Writeln("DANH SÁCH LIỆT SĨ");
            //builder.Writeln("");
            //builder.Writeln("");

            //builder.StartTable();

            //font.Size = 12;
            //builder.InsertCell();
            //builder.Write("STT");

            //builder.InsertCell();
            //builder.Writeln("Họ và tên");
            //builder.Write("Năm sinh");


            //builder.InsertCell();
            //builder.Writeln("- Quê quán");
            //builder.Write("- Trú quân");

            //builder.InsertCell();
            //builder.Writeln("- Nhập ngũ");
            //builder.Write("- Tái ngũ");

            //builder.InsertCell();
            //builder.Writeln("- Đơn vị");
            //builder.Writeln("- Cấp bậc");
            //builder.Write("- Chức vụ");

            //builder.InsertCell();
            //builder.Writeln("- Nơi hy sinh");
            //builder.Write("- Nơi mai táng ban đầu");

            //builder.InsertCell();
            //builder.Writeln("Thân nhân");
            //font.Bold = false;
            //font.Italic = true;
            //builder.Write("(Họ tên, quan hệ)");

            //builder.InsertCell();
            //font.Bold = true;
            //font.Italic = false;
            //builder.Writeln("Đã quy tập");
            //font.Bold = false;
            //font.Italic = true;
            //builder.Write("(Tên nghĩa trang, số mộ)");

            //builder.EndRow();

            //int i = 1;
            //foreach (DataRow dtRow in data.Rows)
            //{
            //    builder.InsertCell();
            //    builder.ParagraphFormat.Alignment = ParagraphAlignment.Center;
            //    font.Italic = false;
            //    builder.Write(i.ToString());

            //    builder.InsertCell();
            //    builder.ParagraphFormat.Alignment = ParagraphAlignment.Left;

            //    if (dtRow["HoTen"] != null)
            //    {
            //        builder.Writeln(dtRow["HoTen"].ToString());
            //    }
            //    if (dtRow["NamSinh"] != null)
            //    {
            //        builder.Write(dtRow["NamSinh"].ToString());
            //    }

            //    builder.InsertCell();
            //    if (dtRow["QueThon"] != null)
            //    {
            //        builder.Write(dtRow["QueThon"].ToString() + "-");
            //    }
            //    if (dtRow["QueXaName"] != null)
            //    {
            //        builder.Write(dtRow["QueXaName"].ToString() + "-");
            //    }
            //    if (dtRow["QueHuyenName"] != null)
            //    {
            //        builder.Write(dtRow["QueHuyenName"].ToString() + "-");
            //    }
            //    if (dtRow["QueTinhName"] != null)
            //    {
            //        builder.Write(dtRow["QueTinhName"].ToString());
            //    }

            //    builder.InsertCell();


            //    builder.InsertCell();
            //    if (dtRow["TenDonVi"] != null)
            //    {
            //        builder.Writeln("- " + dtRow["TenDonVi"].ToString());
            //    }
            //    else
            //    {
            //        builder.Writeln("- ");
            //    }
            //    if (dtRow["CapBacName"] != null)
            //    {
            //        builder.Write("- " + dtRow["CapBacName"].ToString());
            //    }
            //    else
            //    {
            //        builder.Writeln("- ");
            //    }

            //    if (dtRow["ChucVuName"] != null)
            //    {
            //        builder.Write("- " + dtRow["ChucVuName"].ToString());
            //    }
            //    else
            //    {
            //        builder.Writeln("- ");
            //    }

            //    builder.InsertCell();


            //    builder.InsertCell();


            //    builder.InsertCell();





            //    builder.EndRow();
            //    i++;
            //}

            //builder.EndTable();


            //PageSetup ps = builder.PageSetup;
            //ps.PaperSize = Aspose.Words.PaperSize.A4;
            //ps.TopMargin = 0;
            //ps.LeftMargin = 20;
            //ps.RightMargin = 20;
            //ps.BottomMargin = 0;
            //ps.Orientation = Orientation.Landscape;
            //doc.Save(ms, Aspose.Words.SaveFormat.Doc);
            //byte[] bytes = ms.ToArray();

            //return File(bytes, "application/msword", "DanhSachLietSi.doc");


            var comlumHeadrs = new string[]
           {
                "STT",
                "Họ và tên",
                "Năm Sinh",
                "Quê quán",
                //"Trú quân",
                "Nhập ngũ" ,
                "Tái ngũ" ,
                "Đơn vị",
                "Cấp bậc",
                "Chức vụ",
                "Hy sinh",
                "Trường hợp hy sinh",
                "Giấy báo tử",
                "Nơi hy sinh" ,
                "Nơi mai táng ban đầu",
                "Thân nhân",
                "Đã quy tập"
           };

            byte[] result;

            using (var package = new ExcelPackage())
            {
                // add a new worksheet to the empty workbook

                var worksheet = package.Workbook.Worksheets.Add("Sheet1");

                worksheet.Column(1).Width = 5;
                worksheet.Column(2).Width = 25;
                worksheet.Column(3).Width = 10;
                worksheet.Column(4).Width = 30;
                //worksheet.Column(5).Width = 30;
                worksheet.Column(5).Width = 15;
                worksheet.Column(6).Width = 15;
                worksheet.Column(7).Width = 30;
                worksheet.Column(8).Width = 20;
                worksheet.Column(9).Width = 20;
                worksheet.Column(10).Width = 15;
                worksheet.Column(11).Width = 30;
                worksheet.Column(12).Width = 20;
                worksheet.Column(13).Width = 30;
                worksheet.Column(14).Width = 30;
                worksheet.Column(15).Width = 30;
                worksheet.Column(16).Width = 30;

                worksheet.Cells["A1:Q1"].Merge = true;
                worksheet.Cells[1, 1].Value = "DANH SÁCH LIỆT SỸ";

                using (var cells = worksheet.Cells[1, 1, 1, 3]) //(1,1) (1,5)
                {
                    cells.Style.Font.Bold = true;
                    cells.Style.Font.Size = 18;
                    cells.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                }

                //First add the headers
                for (var i = 0; i < comlumHeadrs.Count(); i++)
                {
                    var cell = worksheet.Cells[3, i + 1];
                    cell.Value = comlumHeadrs[i];
                    cell.Style.Font.Bold = true;
                    cell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    cell.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    cell.Style.Fill.BackgroundColor.SetColor(Color.LightGray);
                }

                //Add values
                var j = 4;
                var k = 1;
                var data = lietSyService.ExportListLietSi(searhData);
                foreach (DataRow dtRow in data.Rows)
                {
                    worksheet.Cells["A" + j].Value = k;
                    worksheet.Cells["B" + j].Value = dtRow["HoTen"];
                    worksheet.Cells["C" + j].Value = dtRow["NamSinh"];
                    worksheet.Cells["D" + j].Value = dtRow["QueThon"] + "-" + dtRow["QueXaName"] + "-" + dtRow["QueHuyenName"] + "-" + dtRow["QueTinhName"];
                    //worksheet.Cells["E" + j].Value = dtRow["QueThon"];
                    
                    if (dtRow["NgayNhapNgu"] != null)
                    {
                        var date = Convert.ToDateTime(dtRow["NgayNhapNgu"].ToString());
                        worksheet.Cells["E" + j].Value = date.ToString("dd/MM/yyy");
                    }

                    if (dtRow["NgayTaiNgu"] != null)
                    {
                        var date = Convert.ToDateTime(dtRow["NgayTaiNgu"].ToString());
                        worksheet.Cells["F" + j].Value = date.ToString("dd/MM/yyy");
                    }
                    worksheet.Cells["G" + j].Value = dtRow["TenDonVi"];
                    worksheet.Cells["H" + j].Value = dtRow["CapBacName"];
                    worksheet.Cells["I" + j].Value = dtRow["ChucVuName"];


                    if (dtRow["NgayHiSinh"] != null)
                    {
                        var date = Convert.ToDateTime(dtRow["NgayHiSinh"].ToString());
                        worksheet.Cells["J" + j].Value = date.ToString("dd/MM/yyy");
                    }
                    worksheet.Cells["K" + j].Value = dtRow["ChucVuName"];
                    worksheet.Cells["L" + j].Value = "";
                    worksheet.Cells["M" + j].Value = dtRow["XaHySinhName"] + "-" + dtRow["HuyenHySinhName"] + "-" + dtRow["TinhHySinhName"];
                    worksheet.Cells["N" + j].Value = dtRow["MaiTangXaName"] + "-" + dtRow["MaiTangHuyenName"] + "-" + dtRow["MaiTangTinhName"];
                    worksheet.Cells["o" + j].Value = dtRow["ThanNhanCha"];
                    if(dtRow["QuyTap"] != null)
                    {
                        worksheet.Cells["P" + j].Value = Convert.ToBoolean(dtRow["QuyTap"]) ? "Đã quy tập" : "Chưa quy tập";

                    }
                    else
                    {
                        worksheet.Cells["P" + j].Value =  "Chưa quy tập";
                    }

                    //worksheet.Cells["D" + j].Value = employee.Salary.ToString("$#,0.00;($#,0.00)");
                    //worksheet.Cells["E" + j].Value = employee.JoinedDate.ToString("MM/dd/yyyy");

                    j++;
                    k++;
                }
                result = package.GetAsByteArray();
            }

            return File(result, "application/ms-excel", $"DanhSachLietSy.xlsx");
        }


    }
}