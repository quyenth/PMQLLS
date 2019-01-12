using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entity
{
    public class DonVi
    {


        public Int32 DonViId { get; set; }
                
        public string MaDonVi { get; set; }
                
        public string TenDonVi { get; set; }
                
        public string TenVietTat { get; set; }
                
        public string MaDonViCha { get; set; }
                
        public Int32 PhanMuc { get; set; }
                
        public string PhanCap { get; set; }
                
        public string PhanKhoi { get; set; }
                
        public string GhiChu { get; set; }
                
        public Boolean? Active { get; set; }
                
        public string CQCS_Ten { get; set; }
                
        public string CQCS_DiaChi { get; set; }
                
        public string CQCS_DienThoai { get; set; }
                
        public string CQCS_HomThu { get; set; }
                
        public string CQCS_ThuTruong { get; set; }
                
        public Int32? CQCS_ThuTruongChucVu { get; set; }
                
        public string CQCS_NguoiPhuTrach { get; set; }
                
        public string CQCS_NguoiPhuTrachPhone { get; set; }
                 
    }
}
