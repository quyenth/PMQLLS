﻿// <auto-generated />
using System;
using Application.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Application.IdentityServer.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20190502085831_updateDb")]
    partial class updateDb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Application.Domain.Entity.AccessHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("AccessTime");

                    b.Property<string>("Account");

                    b.Property<string>("FullName");

                    b.Property<string>("IPAddress");

                    b.HasKey("Id");

                    b.ToTable("AccessHistory");
                });

            modelBuilder.Entity("Application.Domain.Entity.CapBac", b =>
                {
                    b.Property<int>("CapBacId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<string>("Text");

                    b.HasKey("CapBacId");

                    b.ToTable("CapBac");
                });

            modelBuilder.Entity("Application.Domain.Entity.ChucVu", b =>
                {
                    b.Property<int>("ChucVuId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<string>("Name");

                    b.HasKey("ChucVuId");

                    b.ToTable("ChucVu");
                });

            modelBuilder.Entity("Application.Domain.Entity.Config", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConfigCode");

                    b.Property<string>("Description");

                    b.Property<string>("Types");

                    b.Property<string>("Value");

                    b.HasKey("Id");

                    b.ToTable("Config");
                });

            modelBuilder.Entity("Application.Domain.Entity.DiemCao", b =>
                {
                    b.Property<int>("DiemCaoId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DiaChi");

                    b.Property<string>("Ma");

                    b.Property<string>("Note");

                    b.Property<string>("Ten");

                    b.HasKey("DiemCaoId");

                    b.ToTable("DiemCao");
                });

            modelBuilder.Entity("Application.Domain.Entity.DoiTuong", b =>
                {
                    b.Property<int>("DoiTuongId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("DoiTuongId");

                    b.ToTable("DoiTuong");
                });

            modelBuilder.Entity("Application.Domain.Entity.DonVi", b =>
                {
                    b.Property<int>("DonViId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Active");

                    b.Property<string>("CQCS_DiaChi");

                    b.Property<string>("CQCS_DienThoai");

                    b.Property<string>("CQCS_HomThu");

                    b.Property<string>("CQCS_NguoiPhuTrach");

                    b.Property<string>("CQCS_NguoiPhuTrachPhone");

                    b.Property<string>("CQCS_Ten");

                    b.Property<string>("CQCS_ThuTruong");

                    b.Property<int?>("CQCS_ThuTruongChucVu");

                    b.Property<string>("GhiChu");

                    b.Property<string>("MaDonVi");

                    b.Property<string>("MaDonViCha");

                    b.Property<string>("PhanCap");

                    b.Property<string>("PhanKhoi");

                    b.Property<int>("PhanMuc");

                    b.Property<string>("TenDonVi");

                    b.Property<string>("TenVietTat");

                    b.HasKey("DonViId");

                    b.ToTable("DonVi");
                });

            modelBuilder.Entity("Application.Domain.Entity.Huyen", b =>
                {
                    b.Property<int>("HuyenId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Active");

                    b.Property<bool?>("Is1990");

                    b.Property<string>("MaHuyen");

                    b.Property<string>("TenHuyen");

                    b.Property<int?>("TinhId");

                    b.Property<int?>("Type");

                    b.HasKey("HuyenId");

                    b.ToTable("Huyen");
                });

            modelBuilder.Entity("Application.Domain.Entity.LietSy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Active");

                    b.Property<string>("BiDanh");

                    b.Property<string>("CreatdedBy");

                    b.Property<DateTime?>("Created");

                    b.Property<int?>("DanToc");

                    b.Property<bool?>("DangVien");

                    b.Property<string>("DiaPhuongNhapNgu");

                    b.Property<bool?>("DoanVien");

                    b.Property<int?>("DoiTuongId");

                    b.Property<string>("DonViHuanLuyen");

                    b.Property<int?>("DonViLuuTruId");

                    b.Property<int?>("DonViQuanLyId");

                    b.Property<int?>("DonVi_B_C_D");

                    b.Property<int?>("DonVi_E");

                    b.Property<int?>("DonVi_F");

                    b.Property<int?>("DonVi_G");

                    b.Property<string>("GhiChu");

                    b.Property<string>("GiayBaoTu");

                    b.Property<short?>("GioiTinh");

                    b.Property<int?>("HiSinhLyDoID");

                    b.Property<string>("HoTen");

                    b.Property<string>("HomThuDonVi");

                    b.Property<int?>("HySinhCapBac");

                    b.Property<int?>("HySinhChucVu");

                    b.Property<string>("HySinhDiaDiem");

                    b.Property<int?>("HySinhDonVi");

                    b.Property<int?>("HySinhHuyenId");

                    b.Property<string>("HySinhLyDoChiTiet");

                    b.Property<int?>("HySinhMatTranId");

                    b.Property<int?>("HySinhThoiKyId");

                    b.Property<int?>("HySinhTinhId");

                    b.Property<string>("HySinhTranDanh");

                    b.Property<int?>("HySinhXaId");

                    b.Property<string>("KhenThuong");

                    b.Property<bool?>("MaiTang");

                    b.Property<string>("MaiTangBanDo");

                    b.Property<int?>("MaiTangDiemCaoId");

                    b.Property<int?>("MaiTangHuyenId");

                    b.Property<int?>("MaiTangTinhId");

                    b.Property<string>("MaiTangToaDo");

                    b.Property<int?>("MaiTangXaId");

                    b.Property<bool?>("MatThiHai");

                    b.Property<bool?>("MatTich");

                    b.Property<int?>("NamSinh");

                    b.Property<DateTime?>("NgayBaoTu");

                    b.Property<DateTime?>("NgayCapBangTQGC");

                    b.Property<DateTime?>("NgayDiBCK");

                    b.Property<DateTime?>("NgayHiSinh");

                    b.Property<DateTime?>("NgayNhapNgu");

                    b.Property<DateTime?>("NgayTaiNgu");

                    b.Property<DateTime?>("NgayVaoDang");

                    b.Property<DateTime?>("NgayVaoDoan");

                    b.Property<DateTime?>("NgayXuatNgu");

                    b.Property<string>("NghiaTrang");

                    b.Property<int?>("QueHuyenId");

                    b.Property<string>("QueThon");

                    b.Property<int?>("QueTinhId");

                    b.Property<int?>("QueXaId");

                    b.Property<int?>("QuocTich");

                    b.Property<bool?>("QuyTap");

                    b.Property<string>("SoBangTQGC");

                    b.Property<int>("SoQuyenId");

                    b.Property<string>("Ten");

                    b.Property<string>("TenKhac");

                    b.Property<string>("ThanNhanBaoTin");

                    b.Property<string>("ThanNhanCha");

                    b.Property<string>("ThanNhanCon");

                    b.Property<string>("ThanNhanDiaChi");

                    b.Property<string>("ThanNhanKhac");

                    b.Property<string>("ThanNhanMe");

                    b.Property<string>("ThanNhanVo");

                    b.Property<int?>("ThuTu");

                    b.Property<int?>("TruQuanHuyenId");

                    b.Property<string>("TruQuanThon");

                    b.Property<int?>("TruQuanTinhId");

                    b.Property<int?>("TruQuanXaId");

                    b.Property<DateTime?>("Updated");

                    b.Property<string>("UpdatedBy");

                    b.Property<string>("ViTriMo");

                    b.Property<string>("maiTangDiaDiem");

                    b.HasKey("Id");

                    b.ToTable("LietSy");
                });

            modelBuilder.Entity("Application.Domain.Entity.LoaiDoiTuong", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("LoaiDoiTuong");
                });

            modelBuilder.Entity("Application.Domain.Entity.MatTran", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DiaBan");

                    b.Property<string>("GhiChu");

                    b.Property<string>("Ma");

                    b.Property<string>("ThoiGian");

                    b.HasKey("Id");

                    b.ToTable("MatTran");
                });

            modelBuilder.Entity("Application.Domain.Entity.Ncc_PhieuCungCap", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("DonViId");

                    b.Property<int?>("LetSyChucVu");

                    b.Property<string>("LieSySoDoViTri");

                    b.Property<string>("LietSiHoTien");

                    b.Property<int?>("LietSyCapBac");

                    b.Property<string>("LietSyDacDiem");

                    b.Property<int?>("LietSyDonVi");

                    b.Property<string>("LietSyLyDoBietMo");

                    b.Property<string>("LietSyMaiTang");

                    b.Property<int?>("LietSyMaiTangHuyen");

                    b.Property<int?>("LietSyMaiTangTinh");

                    b.Property<int?>("LietSyMaiTangXa");

                    b.Property<DateTime?>("LietSyNgayHySinh");

                    b.Property<int?>("LietSyQueHuyen");

                    b.Property<string>("LietSyQueThon");

                    b.Property<int?>("LietSyQueTinh");

                    b.Property<int?>("LietSyQueXa");

                    b.Property<string>("LietSyToaDo");

                    b.Property<string>("Ncc_BanThan");

                    b.Property<int?>("Ncc_DonVi");

                    b.Property<string>("Ncc_HoTen");

                    b.Property<string>("Ncc_KienNghi");

                    b.Property<string>("Ncc_LiemHe");

                    b.Property<string>("Ncc_LienHeVoiLietSi");

                    b.Property<int?>("Ncc_NamSinh");

                    b.Property<int?>("Ncc_QueHuyen");

                    b.Property<int?>("Ncc_QueTinh");

                    b.Property<int?>("Ncc_QueXa");

                    b.Property<string>("NguoiBietKhac");

                    b.Property<string>("NguoiBietKhacLienHe");

                    b.HasKey("Id");

                    b.ToTable("Ncc_PhieuCungCap");
                });

            modelBuilder.Entity("Application.Domain.Entity.NghiaTrang", b =>
                {
                    b.Property<int>("NghiaTrangId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("MaNghiaTrang");

                    b.Property<string>("TenNghiaTrang");

                    b.HasKey("NghiaTrangId");

                    b.ToTable("NghiaTrang");
                });

            modelBuilder.Entity("Application.Domain.Entity.Pupil", b =>
                {
                    b.Property<int>("PupilID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClassName");

                    b.Property<string>("PupilName");

                    b.HasKey("PupilID");

                    b.ToTable("Pupils");
                });

            modelBuilder.Entity("Application.Domain.Entity.RoleInfo", b =>
                {
                    b.Property<int>("RoleID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description");

                    b.Property<string>("RoleCode");

                    b.Property<string>("RoleName");

                    b.HasKey("RoleID");

                    b.ToTable("RoleInfo");
                });

            modelBuilder.Entity("Application.Domain.Entity.SoQuyen", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("SoQuyen");
                });

            modelBuilder.Entity("Application.Domain.Entity.ThoiKy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ThoiKy");
                });

            modelBuilder.Entity("Application.Domain.Entity.Tinh", b =>
                {
                    b.Property<int>("TinhId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Active");

                    b.Property<string>("GhiChu");

                    b.Property<bool?>("Is1990");

                    b.Property<string>("MaTinh");

                    b.Property<string>("TenTinh");

                    b.Property<int?>("Type");

                    b.HasKey("TinhId");

                    b.ToTable("Tinh");
                });

            modelBuilder.Entity("Application.Domain.Entity.UseProvincer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ProvincerId");

                    b.Property<string>("RoleId");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.ToTable("UseProvincer");
                });

            modelBuilder.Entity("Application.Domain.Entity.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Account");

                    b.Property<bool?>("Active");

                    b.Property<string>("Email");

                    b.Property<string>("FullName");

                    b.Property<string>("Note");

                    b.Property<string>("Password");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("Application.Domain.Entity.UserRole", b =>
                {
                    b.Property<int>("UserRoleId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Account");

                    b.Property<string>("RoleCode");

                    b.HasKey("UserRoleId");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("Application.Domain.Entity.Xa", b =>
                {
                    b.Property<int>("XaId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool?>("Active");

                    b.Property<int?>("HuyenId");

                    b.Property<bool?>("Is1990");

                    b.Property<string>("MaDiaChi");

                    b.Property<string>("MaXa");

                    b.Property<string>("TenXa");

                    b.Property<int?>("Type");

                    b.HasKey("XaId");

                    b.ToTable("Xa");
                });
#pragma warning restore 612, 618
        }
    }
}
