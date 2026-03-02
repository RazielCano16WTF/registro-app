package com.evaluacion.registro.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import java.util.List;

@Entity
@Table(name = "registros")
public class Registro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre es requerido")
    @Column(nullable = false)
    private String nombre;
    
    @NotBlank(message = "La fecha de nacimiento es requerida")
    @Pattern(regexp = "^\\d{2}/\\d{2}/\\d{4}$", message = "Formato de fecha inválido (dd/mm/yyyy)")
    @Column(nullable = false)
    private String fechaNacimiento;
    
    @NotBlank(message = "El correo electrónico es requerido")
    @Email(message = "Formato de correo electrónico inválido")
    @Column(nullable = false)
    private String correoElectronico;
    
    @NotBlank(message = "El sexo es requerido")
    @Pattern(regexp = "^[MF]$", message = "El sexo debe ser M o F")
    @Column(nullable = false, length = 1)
    private String sexo;
    
    @ElementCollection
    @CollectionTable(name = "registro_hobbies", joinColumns = @JoinColumn(name = "registro_id"))
    @Column(name = "hobby")
    private List<String> hobbies;
    
    public Registro() {
    }
    
    public Registro(Long id, String nombre, String fechaNacimiento, String correoElectronico, String sexo, List<String> hobbies) {
        this.id = id;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.correoElectronico = correoElectronico;
        this.sexo = sexo;
        this.hobbies = hobbies;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getFechaNacimiento() {
        return fechaNacimiento;
    }
    
    public void setFechaNacimiento(String fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }
    
    public String getCorreoElectronico() {
        return correoElectronico;
    }
    
    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }
    
    public String getSexo() {
        return sexo;
    }
    
    public void setSexo(String sexo) {
        this.sexo = sexo;
    }
    
    public List<String> getHobbies() {
        return hobbies;
    }
    
    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }
}
