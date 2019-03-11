using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Application.IdentityServer.Migrations
{
    public partial class innitDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccessHistory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Account = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    AccessTime = table.Column<DateTime>(nullable: true),
                    IPAddress = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessHistory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CapBac",
                columns: table => new
                {
                    CapBacId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CapBac", x => x.CapBacId);
                });

            migrationBuilder.CreateTable(
                name: "ChucVu",
                columns: table => new
                {
                    ChucVuId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChucVu", x => x.ChucVuId);
                });

            migrationBuilder.CreateTable(
                name: "Config",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ConfigCode = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Types = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Config", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DiemCao",
                columns: table => new
                {
                    DiemCaoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Ma = table.Column<string>(nullable: true),
                    Ten = table.Column<string>(nullable: true),
                    DiaChi = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiemCao", x => x.DiemCaoId);
                });

            migrationBuilder.CreateTable(
                name: "DoiTuong",
                columns: table => new
                {
                    DoiTuongId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoiTuong", x => x.DoiTuongId);
                });

            migrationBuilder.CreateTable(
                name: "DonVi",
                columns: table => new
                {
                    DonViId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MaDonVi = table.Column<string>(nullable: true),
                    TenDonVi = table.Column<string>(nullable: true),
                    TenVietTat = table.Column<string>(nullable: true),
                    MaDonViCha = table.Column<string>(nullable: true),
                    PhanMuc = table.Column<int>(nullable: false),
                    PhanCap = table.Column<string>(nullable: true),
                    PhanKhoi = table.Column<string>(nullable: true),
                    GhiChu = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: true),
                    CQCS_Ten = table.Column<string>(nullable: true),
                    CQCS_DiaChi = table.Column<string>(nullable: true),
                    CQCS_DienThoai = table.Column<string>(nullable: true),
                    CQCS_HomThu = table.Column<string>(nullable: true),
                    CQCS_ThuTruong = table.Column<string>(nullable: true),
                    CQCS_ThuTruongChucVu = table.Column<int>(nullable: true),
                    CQCS_NguoiPhuTrach = table.Column<string>(nullable: true),
                    CQCS_NguoiPhuTrachPhone = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonVi", x => x.DonViId);
                });

            migrationBuilder.CreateTable(
                name: "Huyen",
                columns: table => new
                {
                    HuyenId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MaHuyen = table.Column<string>(nullable: true),
                    TenHuyen = table.Column<string>(nullable: true),
                    TinhId = table.Column<int>(nullable: true),
                    Type = table.Column<int>(nullable: true),
                    Active = table.Column<bool>(nullable: true),
                    Is1990 = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Huyen", x => x.HuyenId);
                });

            migrationBuilder.CreateTable(
                name: "LietSy",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ThuTu = table.Column<int>(nullable: true),
                    SoGoSo = table.Column<int>(nullable: true),
                    SoQuyen = table.Column<string>(nullable: true),
                    HoTen = table.Column<string>(nullable: true),
                    Ten = table.Column<string>(nullable: true),
                    TenKhac = table.Column<string>(nullable: true),
                    BiDanh = table.Column<string>(nullable: true),
                    GioiTinh = table.Column<short>(nullable: true),
                    NamSinh = table.Column<int>(nullable: true),
                    DanToc = table.Column<int>(nullable: true),
                    QuocTich = table.Column<int>(nullable: true),
                    QueThon = table.Column<string>(nullable: true),
                    QueXaId = table.Column<int>(nullable: true),
                    QueHuyenId = table.Column<int>(nullable: true),
                    QueTinhId = table.Column<int>(nullable: true),
                    TruQuanThon = table.Column<string>(nullable: true),
                    TruQuanXaId = table.Column<int>(nullable: true),
                    TruQuanHuyenId = table.Column<int>(nullable: true),
                    TruQuanTinhId = table.Column<int>(nullable: true),
                    DiaPhuongNhapNgu = table.Column<string>(nullable: true),
                    NgayNhapNgu = table.Column<DateTime>(nullable: true),
                    NgayXuatNgu = table.Column<DateTime>(nullable: true),
                    NgayTaiNgu = table.Column<DateTime>(nullable: true),
                    NgayDiBCK = table.Column<DateTime>(nullable: true),
                    DonViHuanLuyen = table.Column<string>(nullable: true),
                    DoanVien = table.Column<bool>(nullable: true),
                    NgayVaoDoan = table.Column<DateTime>(nullable: true),
                    DangVien = table.Column<bool>(nullable: true),
                    NgayVaoDang = table.Column<DateTime>(nullable: true),
                    KhenThuong = table.Column<string>(nullable: true),
                    NgayHiSinh = table.Column<DateTime>(nullable: true),
                    HiSinhLyDoID = table.Column<int>(nullable: true),
                    HySinhLyDoChiTiet = table.Column<string>(nullable: true),
                    HySinhThoiKyId = table.Column<int>(nullable: true),
                    DoiTuongId = table.Column<int>(nullable: true),
                    HySinhMatTranId = table.Column<int>(nullable: true),
                    HySinhTranDanh = table.Column<string>(nullable: true),
                    HySinhDiaDiem = table.Column<string>(nullable: true),
                    HySinhXaId = table.Column<int>(nullable: true),
                    HySinhHuyenId = table.Column<int>(nullable: true),
                    HySinhTinhId = table.Column<int>(nullable: true),
                    MaiTangXaId = table.Column<int>(nullable: true),
                    MaiTangHuyenId = table.Column<int>(nullable: true),
                    MaiTangTinhId = table.Column<int>(nullable: true),
                    MaiTangBanDo = table.Column<string>(nullable: true),
                    MaiTangToaDo = table.Column<string>(nullable: true),
                    MaiTangDiemCaoId = table.Column<int>(nullable: true),
                    NghiaTrang = table.Column<string>(nullable: true),
                    ViTriMo = table.Column<string>(nullable: true),
                    QuyTap = table.Column<bool>(nullable: true),
                    MaiTang = table.Column<bool>(nullable: true),
                    MatThiHai = table.Column<bool>(nullable: true),
                    MatTich = table.Column<bool>(nullable: true),
                    NgayBaoTu = table.Column<DateTime>(nullable: true),
                    GiayBaoTu = table.Column<string>(nullable: true),
                    ThanNhanCha = table.Column<string>(nullable: true),
                    ThanNhanMe = table.Column<string>(nullable: true),
                    ThanNhanVo = table.Column<string>(nullable: true),
                    ThanNhanCon = table.Column<string>(nullable: true),
                    ThanNhanKhac = table.Column<string>(nullable: true),
                    ThanNhanBaoTin = table.Column<string>(nullable: true),
                    ThanNhanDiaChi = table.Column<string>(nullable: true),
                    NgayCapBangTQGC = table.Column<DateTime>(nullable: true),
                    SoBangTQGC = table.Column<string>(nullable: true),
                    DonViLuuTruId = table.Column<int>(nullable: true),
                    DonViQuanLyId = table.Column<int>(nullable: true),
                    HySinhDonVi = table.Column<int>(nullable: true),
                    DonVi_B_C_D = table.Column<int>(nullable: true),
                    DonVi_E = table.Column<int>(nullable: true),
                    DonVi_F = table.Column<int>(nullable: true),
                    DonVi_G = table.Column<int>(nullable: true),
                    HomThuDonVi = table.Column<string>(nullable: true),
                    HySinhCapBac = table.Column<int>(nullable: true),
                    HySinhChucVu = table.Column<int>(nullable: true),
                    GhiChu = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: true),
                    Created = table.Column<DateTime>(nullable: true),
                    CreatdedBy = table.Column<string>(nullable: true),
                    Updated = table.Column<DateTime>(nullable: true),
                    UpdatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LietSy", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoaiDoiTuong",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiDoiTuong", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MatTran",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Ma = table.Column<string>(nullable: true),
                    ThoiGian = table.Column<string>(nullable: true),
                    DiaBan = table.Column<string>(nullable: true),
                    GhiChu = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatTran", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ncc_PhieuCungCap",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DonViId = table.Column<int>(nullable: true),
                    Ncc_HoTen = table.Column<string>(nullable: true),
                    Ncc_NamSinh = table.Column<int>(nullable: true),
                    Ncc_QueXa = table.Column<int>(nullable: true),
                    Ncc_QueHuyen = table.Column<int>(nullable: true),
                    Ncc_QueTinh = table.Column<int>(nullable: true),
                    Ncc_LiemHe = table.Column<string>(nullable: true),
                    Ncc_BanThan = table.Column<string>(nullable: true),
                    Ncc_LienHeVoiLietSi = table.Column<string>(nullable: true),
                    Ncc_DonVi = table.Column<int>(nullable: true),
                    Ncc_KienNghi = table.Column<string>(nullable: true),
                    LietSiHoTien = table.Column<string>(nullable: true),
                    LietSyQueThon = table.Column<string>(nullable: true),
                    LietSyQueXa = table.Column<int>(nullable: true),
                    LietSyQueHuyen = table.Column<int>(nullable: true),
                    LietSyQueTinh = table.Column<int>(nullable: true),
                    LietSyCapBac = table.Column<int>(nullable: true),
                    LetSyChucVu = table.Column<int>(nullable: true),
                    LietSyDonVi = table.Column<int>(nullable: true),
                    LietSyNgayHySinh = table.Column<DateTime>(nullable: true),
                    LietSyDacDiem = table.Column<string>(nullable: true),
                    LietSyMaiTang = table.Column<string>(nullable: true),
                    LietSyMaiTangXa = table.Column<int>(nullable: true),
                    LietSyMaiTangHuyen = table.Column<int>(nullable: true),
                    LietSyMaiTangTinh = table.Column<int>(nullable: true),
                    LietSyToaDo = table.Column<string>(nullable: true),
                    LieSySoDoViTri = table.Column<string>(nullable: true),
                    LietSyLyDoBietMo = table.Column<string>(nullable: true),
                    NguoiBietKhac = table.Column<string>(nullable: true),
                    NguoiBietKhacLienHe = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ncc_PhieuCungCap", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pupils",
                columns: table => new
                {
                    PupilID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PupilName = table.Column<string>(nullable: true),
                    ClassName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pupils", x => x.PupilID);
                });

            migrationBuilder.CreateTable(
                name: "RoleInfo",
                columns: table => new
                {
                    RoleID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    RoleCode = table.Column<string>(nullable: true),
                    RoleName = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleInfo", x => x.RoleID);
                });

            migrationBuilder.CreateTable(
                name: "ThoiKy",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThoiKy", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tinh",
                columns: table => new
                {
                    TinhId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MaTinh = table.Column<string>(nullable: true),
                    TenTinh = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: true),
                    Active = table.Column<bool>(nullable: true),
                    Is1990 = table.Column<bool>(nullable: true),
                    GhiChu = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tinh", x => x.TinhId);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Account = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    FullName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true),
                    Active = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    UserRoleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Account = table.Column<string>(nullable: true),
                    RoleCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.UserRoleId);
                });

            migrationBuilder.CreateTable(
                name: "Xa",
                columns: table => new
                {
                    XaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MaXa = table.Column<string>(nullable: true),
                    TenXa = table.Column<string>(nullable: true),
                    HuyenId = table.Column<int>(nullable: true),
                    MaDiaChi = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: true),
                    Active = table.Column<bool>(nullable: true),
                    Is1990 = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Xa", x => x.XaId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessHistory");

            migrationBuilder.DropTable(
                name: "CapBac");

            migrationBuilder.DropTable(
                name: "ChucVu");

            migrationBuilder.DropTable(
                name: "Config");

            migrationBuilder.DropTable(
                name: "DiemCao");

            migrationBuilder.DropTable(
                name: "DoiTuong");

            migrationBuilder.DropTable(
                name: "DonVi");

            migrationBuilder.DropTable(
                name: "Huyen");

            migrationBuilder.DropTable(
                name: "LietSy");

            migrationBuilder.DropTable(
                name: "LoaiDoiTuong");

            migrationBuilder.DropTable(
                name: "MatTran");

            migrationBuilder.DropTable(
                name: "Ncc_PhieuCungCap");

            migrationBuilder.DropTable(
                name: "Pupils");

            migrationBuilder.DropTable(
                name: "RoleInfo");

            migrationBuilder.DropTable(
                name: "ThoiKy");

            migrationBuilder.DropTable(
                name: "Tinh");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "Xa");
        }
    }
}
