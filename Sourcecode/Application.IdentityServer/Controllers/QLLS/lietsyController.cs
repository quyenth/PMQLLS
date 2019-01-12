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

namespace Application.IdentityServer.Controllers.QLLS
{
    [Produces("application/json")]
    [Route("api/LietSy/[action]")]
    public class LietSyController : ControllerBase
    {
        private ILietSyService lietSyService;

        private readonly UserManager<ApplicationUser> userManager;

        public LietSyController (ILietSyService lietSyService , UserManager<ApplicationUser> userManager)
        {
            this.lietSyService = lietSyService;
            this.userManager = userManager;

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
        public ActionResult ExportListLietSi ([FromBody]LietsiSearchCondition searhData)
        {
            MemoryStream ms = new MemoryStream();
            Document doc = new Document();
            DocumentBuilder builder = new DocumentBuilder(doc);

            var data = lietSyService.ExportListLietSi(searhData);

            builder.ParagraphFormat.Alignment = ParagraphAlignment.Center;
            Aspose.Words.Font font = builder.Font;
            font.Size = 16;
            font.Bold = true;
            font.Name = "Times New Roman";
            builder.Writeln("DANH SÁCH LIỆT SĨ");
            builder.Writeln("");
            builder.Writeln("");

            builder.StartTable();

            font.Size = 12;
            builder.InsertCell();
            builder.Write("STT");

            builder.InsertCell();
            builder.Writeln("Họ và tên");
            builder.Write("Năm sinh");


            builder.InsertCell();
            builder.Writeln("- Quê quán");
            builder.Write("- Trú quân");

            builder.InsertCell();
            builder.Writeln("- Nhập ngũ");
            builder.Write("- Tái ngũ");

            builder.InsertCell();
            builder.Writeln("- Đơn vị");
            builder.Writeln("- Cấp bậc");
            builder.Write("- Chức vụ");

            builder.InsertCell();
            builder.Writeln("- Nơi hy sinh");
            builder.Write("- Nơi mai táng ban đầu");

            builder.InsertCell();
            builder.Writeln("Thân nhân");
            font.Bold = false;
            font.Italic = true;
            builder.Write("(Họ tên, quan hệ)");

            builder.InsertCell();
            font.Bold = true;
            font.Italic = false;
            builder.Writeln("Đã quy tập");
            font.Bold = false;
            font.Italic = true;
            builder.Write("(Tên nghĩa trang, số mộ)");

            builder.EndRow();

            int i = 1;
            foreach (DataRow dtRow in data.Rows)
            {
                builder.InsertCell();
                builder.ParagraphFormat.Alignment = ParagraphAlignment.Center;
                font.Italic = false;
                builder.Write(i.ToString());

                builder.InsertCell();
                builder.ParagraphFormat.Alignment = ParagraphAlignment.Left;

                if (dtRow["HoTen"] != null)
                {
                    builder.Writeln(dtRow["HoTen"].ToString());
                }
                if (dtRow["NamSinh"] != null)
                {
                    builder.Write(dtRow["NamSinh"].ToString());
                }

                builder.InsertCell();
                if (dtRow["QueThon"] != null)
                {
                    builder.Write(dtRow["QueThon"].ToString() + "-");
                }
                if (dtRow["QueXaName"] != null)
                {
                    builder.Write(dtRow["QueXaName"].ToString() + "-");
                }
                if (dtRow["QueHuyenName"] != null)
                {
                    builder.Write(dtRow["QueHuyenName"].ToString() + "-");
                }
                if (dtRow["QueTinhName"] != null)
                {
                    builder.Write(dtRow["QueTinhName"].ToString());
                }

                builder.InsertCell();


                builder.InsertCell();
                if (dtRow["TenDonVi"] != null)
                {
                    builder.Writeln("- " + dtRow["TenDonVi"].ToString());
                }
                else
                {
                    builder.Writeln("- ");
                }
                if (dtRow["CapBacName"] != null)
                {
                    builder.Write("- " + dtRow["CapBacName"].ToString());
                }
                else
                {
                    builder.Writeln("- ");
                }

                if (dtRow["ChucVuName"] != null)
                {
                    builder.Write("- " + dtRow["ChucVuName"].ToString());
                }
                else
                {
                    builder.Writeln("- ");
                }

                builder.InsertCell();


                builder.InsertCell();


                builder.InsertCell();





                builder.EndRow();
                i++;
            }

            builder.EndTable();


            PageSetup ps = builder.PageSetup;
            ps.PaperSize = Aspose.Words.PaperSize.A4;
            ps.TopMargin = 0;
            ps.LeftMargin = 20;
            ps.RightMargin = 20;
            ps.BottomMargin = 0;
            ps.Orientation = Orientation.Landscape;
            doc.Save(ms, Aspose.Words.SaveFormat.Doc);
            byte[] bytes = ms.ToArray();

            return File(bytes, "application/msword", "DanhSachLietSi.doc");
        }


    }
}