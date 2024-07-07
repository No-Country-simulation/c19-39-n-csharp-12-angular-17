using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AgendApp.Models;

public partial class AgendappDbContext : DbContext
{
    public AgendappDbContext()
    {
    }

    public AgendappDbContext(DbContextOptions<AgendappDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Administradore> Administradores { get; set; }

    public virtual DbSet<Categoriasmedica> Categoriasmedicas { get; set; }

    public virtual DbSet<Cita> Citas { get; set; }

    public virtual DbSet<Consulta> Consultas { get; set; }

    public virtual DbSet<Horario> Horarios { get; set; }

    public virtual DbSet<Medico> Medicos { get; set; }

    public virtual DbSet<Paciente> Pacientes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

//    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseSqlServer("Server=DESKTOP-V42GFDR\\SQLEXPRESS;DataBase=agendappDb;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Administradore>(entity =>
        {
            entity.HasKey(e => e.IdAdministrador).HasName("PK__administ__EBE80EA1C513330A");

            entity.ToTable("administradores");

            entity.Property(e => e.IdAdministrador).HasColumnName("idAdministrador");
            entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Administradores)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__administr__idUsu__48CFD27E");
        });

        modelBuilder.Entity<Categoriasmedica>(entity =>
        {
            entity.HasKey(e => e.IdCategoria).HasName("PK__categori__8A3D240C6A0CD8D2");

            entity.ToTable("categoriasmedicas");

            entity.Property(e => e.IdCategoria).HasColumnName("idCategoria");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Cita>(entity =>
        {
            entity.HasKey(e => e.IdCita).HasName("PK__citas__814F31266CEE0F02");

            entity.ToTable("citas");

            entity.Property(e => e.IdCita).HasColumnName("idCita");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.Hora).HasColumnName("hora");
            entity.Property(e => e.IdMedico).HasColumnName("idMedico");
            entity.Property(e => e.IdPaciente).HasColumnName("idPaciente");
            entity.Property(e => e.MotivoConsulta)
                .HasColumnType("text")
                .HasColumnName("motivoConsulta");

            entity.HasOne(d => d.IdMedicoNavigation).WithMany(p => p.Cita)
                .HasForeignKey(d => d.IdMedico)
                .HasConstraintName("FK__citas__idMedico__4AB81AF0");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.Cita)
                .HasForeignKey(d => d.IdPaciente)
                .HasConstraintName("FK__citas__idPacient__49C3F6B7");
        });

        modelBuilder.Entity<Consulta>(entity =>
        {
            entity.HasKey(e => e.IdConsulta).HasName("PK__consulta__CA9C61F50DC0E162");

            entity.ToTable("consultas");

            entity.Property(e => e.IdConsulta).HasColumnName("idConsulta");
            entity.Property(e => e.Diagnostico)
                .HasColumnType("text")
                .HasColumnName("diagnostico");
            entity.Property(e => e.IdCita).HasColumnName("idCita");

            entity.HasOne(d => d.IdCitaNavigation).WithMany(p => p.Consulta)
                .HasForeignKey(d => d.IdCita)
                .HasConstraintName("FK__consultas__idCit__4BAC3F29");
        });

        modelBuilder.Entity<Horario>(entity =>
        {
            entity.HasKey(e => e.IdHorario).HasName("PK__horarios__DE60F33AAE123C59");

            entity.ToTable("horarios");

            entity.Property(e => e.IdHorario).HasColumnName("idHorario");
            entity.Property(e => e.Rango)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("rango");
        });

        modelBuilder.Entity<Medico>(entity =>
        {
            entity.HasKey(e => e.IdMedico).HasName("PK__medicos__4E03DEBA7E72BCC2");

            entity.ToTable("medicos");

            entity.Property(e => e.IdMedico).HasColumnName("idMedico");
            entity.Property(e => e.IdCategoria).HasColumnName("idCategoria");
            entity.Property(e => e.IdHorario).HasColumnName("idHorario");
            entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

            entity.HasOne(d => d.IdCategoriaNavigation).WithMany(p => p.Medicos)
                .HasForeignKey(d => d.IdCategoria)
                .HasConstraintName("FK__medicos__idCateg__4D94879B");

            entity.HasOne(d => d.IdHorarioNavigation).WithMany(p => p.Medicos)
                .HasForeignKey(d => d.IdHorario)
                .HasConstraintName("FK__medicos__idHorar__4E88ABD4");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Medicos)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__medicos__idUsuar__4CA06362");
        });

        modelBuilder.Entity<Paciente>(entity =>
        {
            entity.HasKey(e => e.IdPaciente).HasName("PK__paciente__F48A08F29757CBC8");

            entity.ToTable("pacientes");

            entity.Property(e => e.IdPaciente).HasColumnName("idPaciente");
            entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK__pacientes__idUsu__4F7CD00D");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__roles__3C872F7606B68615");

            entity.ToTable("roles");

            entity.Property(e => e.IdRol).HasColumnName("idRol");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__usuarios__645723A62AB3AA62");

            entity.ToTable("usuarios");

            entity.HasIndex(e => e.Email, "UQ__usuarios__AB6E61648D3326F8").IsUnique();

            entity.HasIndex(e => e.Dni, "UQ__usuarios__D87608A71FB02739").IsUnique();

            entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Contrasenia)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("contrasenia");
            entity.Property(e => e.Dni)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("dni");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IdRol).HasColumnName("idRol");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("telefono");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("FK__usuarios__idRol__5070F446");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
