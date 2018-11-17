using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain.Entity
{
    public class Ncc_PhieuCungCap
    {


                    public Int32 Id { get; set; }
                
                    public Int32? DonViId { get; set; }
                
                    public string Ncc_HoTen { get; set; }
                
                    public Int32? Ncc_NamSinh { get; set; }
                
                    public Int32? Ncc_QueXa { get; set; }
                
                    public Int32? Ncc_QueHuyen { get; set; }
                
                    public Int32? Ncc_QueTinh { get; set; }
                
                    public string Ncc_LiemHe { get; set; }
                
                    public string Ncc_BanThan { get; set; }
                
                    public string Ncc_LienHeVoiLietSi { get; set; }
                
                    public Int32? Ncc_DonVi { get; set; }
                
                    public string Ncc_KienNghi { get; set; }
                
                    public string LietSiHoTien { get; set; }
                
                    public string LietSyQueThon { get; set; }
                
                    public Int32? LietSyQueXa { get; set; }
                
                    public Int32? LietSyQueHuyen { get; set; }
                
                    public Int32? LietSyQueTinh { get; set; }
                
                    public Int32? LietSyCapBac { get; set; }
                
                    public Int32? LetSyChucVu { get; set; }
                
                    public Int32? LietSyDonVi { get; set; }
                
                    public DateTime? LietSyNgayHySinh { get; set; }
                
                    public string LietSyDacDiem { get; set; }
                
                    public string LietSyMaiTang { get; set; }
                
                    public Int32? LietSyMaiTangXa { get; set; }
                
                    public Int32? LietSyMaiTangHuyen { get; set; }
                
                    public Int32? LietSyMaiTangTinh { get; set; }
                
                    public string LietSyToaDo { get; set; }
                
                    public string LieSySoDoViTri { get; set; }
                
                    public string LietSyLyDoBietMo { get; set; }
                
                    public string NguoiBietKhac { get; set; }
                
                    public string NguoiBietKhacLienHe { get; set; }
                 
    }
}
