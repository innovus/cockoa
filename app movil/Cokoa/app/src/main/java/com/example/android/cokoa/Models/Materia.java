package com.example.android.cokoa.Models;

/**
 * Created by ASUS on 08/06/2016.
 */
public class Materia {
    public String getNombre_materia() {
        return nombre_materia;
    }

    public void setNombre_materia(String nombre_materia) {
        this.nombre_materia = nombre_materia;
    }

    private String nombre_materia;

    public String getNombre1_docente() {
        return nombre1_docente;
    }

    public void setNombre1_docente(String nombre1_docente) {
        this.nombre1_docente = nombre1_docente;
    }

    public String getNombre2_docente() {
        return nombre2_docente;
    }

    public void setNombre2_docente(String nombre2_docente) {
        this.nombre2_docente = nombre2_docente;
    }

    public String getApellido1_docente() {
        return apellido1_docente;
    }

    public void setApellido1_docente(String apellido1_docente) {
        this.apellido1_docente = apellido1_docente;
    }

    public String getApellido2_docente() {
        return apellido2_docente;
    }

    public void setApellido2_docente(String apellido2_docente) {
        this.apellido2_docente = apellido2_docente;
    }

    private String nombre1_docente;
    private String nombre2_docente;
    private String apellido1_docente;
    private String apellido2_docente;

}
