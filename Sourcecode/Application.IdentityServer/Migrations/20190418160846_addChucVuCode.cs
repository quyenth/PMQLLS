using Microsoft.EntityFrameworkCore.Migrations;

namespace Application.IdentityServer.Migrations
{
    public partial class addChucVuCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "CapBac",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "CapBac");
        }
    }
}
