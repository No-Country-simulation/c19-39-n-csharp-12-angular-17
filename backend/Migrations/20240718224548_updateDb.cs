using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AgendApp.Migrations
{
    /// <inheritdoc />
    public partial class updateDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "categoriasmedicas",
                columns: table => new
                {
                    idCategoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__categori__8A3D240C6A0CD8D2", x => x.idCategoria);
                });

            migrationBuilder.CreateTable(
                name: "horarios",
                columns: table => new
                {
                    idHorario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rango = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__horarios__DE60F33AAE123C59", x => x.idHorario);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    idRol = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__roles__3C872F7606B68615", x => x.idRol);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    idUsuario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dni = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    nombre = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    apellido = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    telefono = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    contrasenia = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    idRol = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__usuarios__645723A62AB3AA62", x => x.idUsuario);
                    table.ForeignKey(
                        name: "FK__usuarios__idRol__5070F446",
                        column: x => x.idRol,
                        principalTable: "roles",
                        principalColumn: "idRol");
                });

            migrationBuilder.CreateTable(
                name: "administradores",
                columns: table => new
                {
                    idAdministrador = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idUsuario = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__administ__EBE80EA1C513330A", x => x.idAdministrador);
                    table.ForeignKey(
                        name: "FK__administr__idUsu__48CFD27E",
                        column: x => x.idUsuario,
                        principalTable: "usuarios",
                        principalColumn: "idUsuario");
                });

            migrationBuilder.CreateTable(
                name: "medicos",
                columns: table => new
                {
                    idMedico = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idUsuario = table.Column<int>(type: "int", nullable: true),
                    idCategoria = table.Column<int>(type: "int", nullable: true),
                    idHorario = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__medicos__4E03DEBA7E72BCC2", x => x.idMedico);
                    table.ForeignKey(
                        name: "FK__medicos__idCateg__4D94879B",
                        column: x => x.idCategoria,
                        principalTable: "categoriasmedicas",
                        principalColumn: "idCategoria");
                    table.ForeignKey(
                        name: "FK__medicos__idHorar__4E88ABD4",
                        column: x => x.idHorario,
                        principalTable: "horarios",
                        principalColumn: "idHorario");
                    table.ForeignKey(
                        name: "FK__medicos__idUsuar__4CA06362",
                        column: x => x.idUsuario,
                        principalTable: "usuarios",
                        principalColumn: "idUsuario");
                });

            migrationBuilder.CreateTable(
                name: "pacientes",
                columns: table => new
                {
                    idPaciente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idUsuario = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__paciente__F48A08F29757CBC8", x => x.idPaciente);
                    table.ForeignKey(
                        name: "FK__pacientes__idUsu__4F7CD00D",
                        column: x => x.idUsuario,
                        principalTable: "usuarios",
                        principalColumn: "idUsuario");
                });

            migrationBuilder.CreateTable(
                name: "citas",
                columns: table => new
                {
                    idCita = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fecha = table.Column<DateOnly>(type: "date", nullable: true),
                    hora = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    idPaciente = table.Column<int>(type: "int", nullable: true),
                    idMedico = table.Column<int>(type: "int", nullable: true),
                    motivoConsulta = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__citas__814F31266CEE0F02", x => x.idCita);
                    table.ForeignKey(
                        name: "FK__citas__idMedico__4AB81AF0",
                        column: x => x.idMedico,
                        principalTable: "medicos",
                        principalColumn: "idMedico");
                    table.ForeignKey(
                        name: "FK__citas__idPacient__49C3F6B7",
                        column: x => x.idPaciente,
                        principalTable: "pacientes",
                        principalColumn: "idPaciente");
                });

            migrationBuilder.CreateTable(
                name: "consultas",
                columns: table => new
                {
                    idConsulta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idCita = table.Column<int>(type: "int", nullable: true),
                    diagnostico = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__consulta__CA9C61F50DC0E162", x => x.idConsulta);
                    table.ForeignKey(
                        name: "FK__consultas__idCit__4BAC3F29",
                        column: x => x.idCita,
                        principalTable: "citas",
                        principalColumn: "idCita");
                });

            migrationBuilder.CreateIndex(
                name: "IX_administradores_idUsuario",
                table: "administradores",
                column: "idUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_citas_idMedico",
                table: "citas",
                column: "idMedico");

            migrationBuilder.CreateIndex(
                name: "IX_citas_idPaciente",
                table: "citas",
                column: "idPaciente");

            migrationBuilder.CreateIndex(
                name: "IX_consultas_idCita",
                table: "consultas",
                column: "idCita");

            migrationBuilder.CreateIndex(
                name: "IX_medicos_idCategoria",
                table: "medicos",
                column: "idCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_medicos_idHorario",
                table: "medicos",
                column: "idHorario");

            migrationBuilder.CreateIndex(
                name: "IX_medicos_idUsuario",
                table: "medicos",
                column: "idUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_pacientes_idUsuario",
                table: "pacientes",
                column: "idUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_idRol",
                table: "usuarios",
                column: "idRol");

            migrationBuilder.CreateIndex(
                name: "UQ__usuarios__AB6E61648D3326F8",
                table: "usuarios",
                column: "email",
                unique: true,
                filter: "[email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UQ__usuarios__D87608A71FB02739",
                table: "usuarios",
                column: "dni",
                unique: true,
                filter: "[dni] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "administradores");

            migrationBuilder.DropTable(
                name: "consultas");

            migrationBuilder.DropTable(
                name: "citas");

            migrationBuilder.DropTable(
                name: "medicos");

            migrationBuilder.DropTable(
                name: "pacientes");

            migrationBuilder.DropTable(
                name: "categoriasmedicas");

            migrationBuilder.DropTable(
                name: "horarios");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "roles");
        }
    }
}
