using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Application.IdentityServer.Migrations
{
    public partial class update_liet_si_tbl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoGoSo",
                table: "LietSy");

            migrationBuilder.DropColumn(
                name: "SoQuyen",
                table: "LietSy");

            migrationBuilder.AddColumn<int>(
                name: "SoQuyenId",
                table: "LietSy",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "SoQuyen",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SoQuyen", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SoQuyen");

            migrationBuilder.DropColumn(
                name: "SoQuyenId",
                table: "LietSy");

            migrationBuilder.AddColumn<int>(
                name: "SoGoSo",
                table: "LietSy",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoQuyen",
                table: "LietSy",
                nullable: true);
        }
    }
}
