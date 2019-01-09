using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCore.Data
{
    public class LietsiSearchCondition
    {
        public int? soquyenId { get; set; }
        public int? thutu { get; set; }

        public int? gioiTinh { get; set; }

        public String hoTen { get; set; }

        public int? namSinh { get; set; }

        public int? queTinhId { get; set; }

        public int? queHuyenId { get; set; }

        public int? queXaId { get; set; }

        public String queThon { get; set; }

        public DateTime? NgayHiSinh { get; set; }

        public int? hySinhCapBac { get; set; }

        public int? hySinhChucVu { get; set; }

        public String hySinhLyDoChiTiet { get; set; }

        public int? HySinhTinhId { get; set; }


        public int? HySinhHuyenId { get; set; }


        public int? HySinhXaId { get; set; }

        public int? MaiTangTinhId { get; set; }


        public int? MaiTangHuyenId { get; set; }


        public int? MaiTangXaId { get; set; }

        public int? donviId { get; set; }

    }
}
