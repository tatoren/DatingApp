using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.api.Migrations
{
    public partial class AdditionalUserField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<string>(
                name: "Interests",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Interests",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Intrests",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }
    }
}
