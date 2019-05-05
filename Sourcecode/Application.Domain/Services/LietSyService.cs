using System;
using System.Collections.Generic;
using Framework.Common;
using Application.Domain.Entity;
using Microsoft.Extensions.Logging;
using AspNetCore.Data;
using System.Data;
using Application.Domain.common;
using System.Data.SqlClient;

namespace Application.Domain.Services
{
    public class LietSyService : BaseService<LietSy, ApplicationContext>, ILietSyService
    {
        public LietSyService(ILogger<LietSyService> logger, ApplicationContext context) : base(logger,context)
        {
        }

        public DataTable ExportListLietSi(LietsiSearchCondition searchCodition, string UserName)
        {
            List<SqlParameter> paras = new List<SqlParameter>()
            {
                
            };

            paras.Add(new SqlParameter("@UserName", UserName));

            if (string.IsNullOrEmpty(searchCodition.hoTen))
            {
                paras.Add(new SqlParameter("@hoten", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@hoten", "%" + searchCodition.hoTen + "%"));
            }

            if (searchCodition.gioiTinh == null || searchCodition.gioiTinh == 0)
            {
                paras.Add(new SqlParameter("@gioitinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@hoten", searchCodition.gioiTinh));
            }

            if (searchCodition.hySinhCapBac == null || searchCodition.hySinhCapBac == 0)
            {
                paras.Add(new SqlParameter("@capbac", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@capbac", searchCodition.hySinhCapBac));
            }

            if (searchCodition.hySinhChucVu == null || searchCodition.hySinhChucVu == 0)
            {
                paras.Add(new SqlParameter("@chucvu", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@chucvu", searchCodition.hySinhChucVu));
            }

            if (searchCodition.soquyenId == null || searchCodition.soquyenId == 0)
            {
                paras.Add(new SqlParameter("@soquyen", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@soquyen", searchCodition.soquyenId));
            }

            if (searchCodition.thutu == null || searchCodition.thutu == 0)
            {
                paras.Add(new SqlParameter("@thutu", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@thutu", searchCodition.thutu));
            }


            if (searchCodition.queTinhId == null || searchCodition.queTinhId == 0)
            {
                paras.Add(new SqlParameter("@queTinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@queTinh", searchCodition.queTinhId));
            }


            if (searchCodition.queHuyenId == null || searchCodition.queHuyenId == 0)
            {
                paras.Add(new SqlParameter("@queHuyen", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@queHuyen", searchCodition.queHuyenId));
            }

            if (searchCodition.queXaId == null || searchCodition.queXaId == 0)
            {
                paras.Add(new SqlParameter("@queXa", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@queXa", searchCodition.queXaId));
            }


            if (string.IsNullOrEmpty(searchCodition.queThon))
            {
                paras.Add(new SqlParameter("@queThon", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@queThon", "%" + searchCodition.queThon + "%"));
            }


            if (searchCodition.namSinh == null || searchCodition.namSinh == 0)
            {
                paras.Add(new SqlParameter("@namSinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@namSinh", searchCodition.namSinh));
            }

            if (searchCodition.NgayHiSinh == null || searchCodition.NgayHiSinh > DateTime.MaxValue || searchCodition.NgayHiSinh < DateTime.MinValue)
            {
                paras.Add(new SqlParameter("@ngayHiSinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@ngayHiSinh", searchCodition.NgayHiSinh));
            }


            if (string.IsNullOrEmpty(searchCodition.hySinhLyDoChiTiet))
            {
                paras.Add(new SqlParameter("@hySinhLyDo", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@hySinhLyDo", "%" + searchCodition.hySinhLyDoChiTiet + "%"));
            }

            if (string.IsNullOrEmpty(searchCodition.diaDiemHySinh))
            {
                paras.Add(new SqlParameter("@diaDiemHySinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@diaDiemHySinh", "%" + searchCodition.diaDiemHySinh + "%"));
            }

            if (string.IsNullOrEmpty(searchCodition.diaDiemMaiTang))
            {
                paras.Add(new SqlParameter("@diaDiemMaiTang", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@diaDiemMaiTang", "%" + searchCodition.diaDiemMaiTang + "%"));
            }


            //if (searchCodition.HySinhTinhId == null || searchCodition.HySinhTinhId == 0)
            //{
            //    paras.Add(new SqlParameter("@HySinhTinhId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@HySinhTinhId", searchCodition.HySinhTinhId));
            //}


            //if (searchCodition.HySinhHuyenId == null || searchCodition.HySinhHuyenId == 0)
            //{
            //    paras.Add(new SqlParameter("@HySinhHuyenId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@HySinhHuyenId", searchCodition.HySinhHuyenId));
            //}

            //if (searchCodition.HySinhXaId == null || searchCodition.HySinhXaId == 0)
            //{
            //    paras.Add(new SqlParameter("@HySinhXaId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@HySinhXaId", searchCodition.HySinhXaId));
            //}


            //if (searchCodition.MaiTangTinhId == null || searchCodition.MaiTangTinhId == 0)
            //{
            //    paras.Add(new SqlParameter("@MaiTangTinhId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@MaiTangTinhId", searchCodition.MaiTangTinhId));
            //}


            //if (searchCodition.MaiTangHuyenId == null || searchCodition.MaiTangHuyenId == 0)
            //{
            //    paras.Add(new SqlParameter("@MaiTangHuyenId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@MaiTangHuyenId", searchCodition.MaiTangHuyenId));
            //}

            //if (searchCodition.MaiTangXaId == null || searchCodition.MaiTangXaId == 0)
            //{
            //    paras.Add(new SqlParameter("@MaiTangXaId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@MaiTangXaId", searchCodition.MaiTangXaId));
            //}

            if (searchCodition.donviId == null || searchCodition.donviId == 0)
            {
                paras.Add(new SqlParameter("@donviId", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@donviId", searchCodition.donviId));
            }

            
            var result = Sqlhelper.ExecDataTable(this.dc, StoredProcedureConstant.ExportListLietSi, CommandType.StoredProcedure, paras.ToArray());

            return result;
        }

        public DataTable SearchListLietSi(LietsiSearchCondition searchCodition, PagingInfo paging, string UserName)
        {
            List<SqlParameter> paras = new List<SqlParameter>()
            {
                new SqlParameter("@PageSize", paging.PageSize),
                new SqlParameter("@PageIndex", paging.PageIndex)
            };

            paras.Add(new SqlParameter("@UserName", UserName));

            if (string.IsNullOrEmpty(searchCodition.hoTen))
            {
                paras.Add(new SqlParameter("@hoten", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@hoten", "%"+ searchCodition.hoTen + "%"));
            }

            if(searchCodition.gioiTinh == null || searchCodition.gioiTinh == 0)
            {
                paras.Add(new SqlParameter("@gioitinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@hoten", searchCodition.gioiTinh));
            }

            if (searchCodition.hySinhCapBac == null || searchCodition.hySinhCapBac == 0)
            {
                paras.Add(new SqlParameter("@capbac", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@capbac", searchCodition.hySinhCapBac));
            }

            if (searchCodition.hySinhChucVu == null || searchCodition.hySinhChucVu == 0)
            {
                paras.Add(new SqlParameter("@chucvu", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@chucvu", searchCodition.hySinhChucVu));
            }

            if (searchCodition.soquyenId == null || searchCodition.soquyenId == 0)
            {
                paras.Add(new SqlParameter("@soquyen", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@soquyen", searchCodition.soquyenId));
            }

            if (searchCodition.thutu == null || searchCodition.thutu == 0)
            {
                paras.Add(new SqlParameter("@thutu", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@thutu", searchCodition.thutu));
            }


            if (searchCodition.queTinhId == null || searchCodition.queTinhId == 0)
            {
                paras.Add(new SqlParameter("@queTinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@queTinh", searchCodition.queTinhId));
            }


            if (searchCodition.queHuyenId == null || searchCodition.queHuyenId == 0)
            {
                paras.Add(new SqlParameter("@queHuyen", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@queHuyen", searchCodition.queHuyenId));
            }

            if (searchCodition.queXaId == null || searchCodition.queXaId == 0)
            {
                paras.Add(new SqlParameter("@queXa", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@queXa", searchCodition.queXaId));
            }


            if (string.IsNullOrEmpty(searchCodition.queThon))
            {
                paras.Add(new SqlParameter("@queThon", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@queThon", "%" + searchCodition.queThon + "%"));
            }


            if (searchCodition.namSinh == null || searchCodition.namSinh == 0)
            {
                paras.Add(new SqlParameter("@namSinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@namSinh", searchCodition.namSinh));
            }

            if (searchCodition.NgayHiSinh == null || searchCodition.NgayHiSinh > DateTime.MaxValue || searchCodition.NgayHiSinh < DateTime.MinValue)
            {
                paras.Add(new SqlParameter("@ngayHiSinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@ngayHiSinh", searchCodition.NgayHiSinh));
            }


            if (string.IsNullOrEmpty(searchCodition.hySinhLyDoChiTiet))
            {
                paras.Add(new SqlParameter("@hySinhLyDo", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@hySinhLyDo", "%" + searchCodition.hySinhLyDoChiTiet + "%"));
            }

            if (string.IsNullOrEmpty(searchCodition.diaDiemHySinh))
            {
                paras.Add(new SqlParameter("@diaDiemHySinh", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@diaDiemHySinh", "%" + searchCodition.diaDiemHySinh + "%"));
            }

            if (string.IsNullOrEmpty(searchCodition.diaDiemMaiTang))
            {
                paras.Add(new SqlParameter("@diaDiemMaiTang", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@diaDiemMaiTang", "%" + searchCodition.diaDiemMaiTang + "%"));
            }


            //if (searchCodition.HySinhTinhId == null || searchCodition.HySinhTinhId == 0)
            //{
            //    paras.Add(new SqlParameter("@HySinhTinhId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@HySinhTinhId", searchCodition.HySinhTinhId));
            //}


            //if (searchCodition.HySinhHuyenId == null || searchCodition.HySinhHuyenId == 0)
            //{
            //    paras.Add(new SqlParameter("@HySinhHuyenId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@HySinhHuyenId", searchCodition.HySinhHuyenId));
            //}

            //if (searchCodition.HySinhXaId == null || searchCodition.HySinhXaId == 0)
            //{
            //    paras.Add(new SqlParameter("@HySinhXaId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@HySinhXaId", searchCodition.HySinhXaId));
            //}


            //if (searchCodition.MaiTangTinhId == null || searchCodition.MaiTangTinhId == 0)
            //{
            //    paras.Add(new SqlParameter("@MaiTangTinhId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@MaiTangTinhId", searchCodition.MaiTangTinhId));
            //}


            //if (searchCodition.MaiTangHuyenId == null || searchCodition.MaiTangHuyenId == 0)
            //{
            //    paras.Add(new SqlParameter("@MaiTangHuyenId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@MaiTangHuyenId", searchCodition.MaiTangHuyenId));
            //}

            //if (searchCodition.MaiTangXaId == null || searchCodition.MaiTangXaId == 0)
            //{
            //    paras.Add(new SqlParameter("@MaiTangXaId", DBNull.Value));
            //}
            //else
            //{
            //    paras.Add(new SqlParameter("@MaiTangXaId", searchCodition.MaiTangXaId));
            //}

            if (searchCodition.donviId == null || searchCodition.donviId == 0)
            {
                paras.Add(new SqlParameter("@donviId", DBNull.Value));
            }
            else
            {
                paras.Add(new SqlParameter("@donviId", searchCodition.donviId));
            }

            SqlParameter countPara = new SqlParameter()
            {
                ParameterName = "@Count",
                Direction = ParameterDirection.Output,
                SqlDbType = SqlDbType.Int
            };
            paras.Add(countPara);
            try
            {
                var result = Sqlhelper.ExecDataTable(this.dc, StoredProcedureConstant.SearchListLietSi, CommandType.StoredProcedure, paras.ToArray());
                paging.TotalCount = (int)countPara.Value;

                return result;
            }catch(Exception ex)
            {
                return null;
            }
          
        }
    }
}

