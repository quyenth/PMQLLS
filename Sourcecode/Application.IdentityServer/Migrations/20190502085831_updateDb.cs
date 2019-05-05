using Microsoft.EntityFrameworkCore.Migrations;

namespace Application.IdentityServer.Migrations
{
    public partial class updateDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "maiTangDiaDiem",
                table: "LietSy",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "maiTangDiaDiem",
                table: "LietSy");
        }
    }
}
