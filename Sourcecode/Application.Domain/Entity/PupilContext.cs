using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Domain.Entity
{
    public class PupilContext : DbContext
    {
        public DbSet<Pupil> Pupils { get; set; }
        public DbSet<AccessHistory> AccessHistory { get; set; }
        public DbSet<CapBac> CapBac { get; set; }
        public DbSet<ChucVu> ChucVu { get; set; }
        public DbSet<Config> Config { get; set; }
        public DbSet<DiemCao> DiemCao { get; set; }
        public DbSet<DoiTuong> DoiTuong { get; set; }
        public DbSet<DonVi> DonVi { get; set; }
        public DbSet<Huyen> Huyen { get; set; }
        public DbSet<LietSy> LietSy { get; set; }
        public DbSet<LoaiDoiTuong> LoaiDoiTuong { get; set; }
        public DbSet<MatTran> MatTran { get; set; }
        public DbSet<Ncc_PhieuCungCap> Ncc_PhieuCungCap { get; set; }
        public DbSet<RoleInfo> RoleInfo { get; set; }
        public DbSet<ThoiKy> ThoiKy { get; set; }
        public DbSet<Tinh> Tinh { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<Xa> Xa { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseInMemoryDatabase("ESchool");
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
