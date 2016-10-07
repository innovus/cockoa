package com.example.android.cokoa.Models;

/**
 * Created by ASUS on 08/06/2016.
 */
public class Materia {
    private String id_materia;
    private String nombre1_docente;
    private String nombre2_docente;
    private String apellido1_docente;
    private String apellido2_docente;
    private String periodo_actual;
    private String nombre_materia;



    private double notaPeriodo1;
    private double notaPeriodo2;
    private double notaPeriodo3;
    private double notaPeriodo4;

    public double getPromedio() {
        return promedio;
    }

    public void setPromedio(double promedio) {
        this.promedio = promedio;
    }

    private double promedio;


    public double getNotaPeriodo2() {
        return notaPeriodo2;
    }

    public void setNotaPeriodo2(double notaPeriodo2) {
        this.notaPeriodo2 = notaPeriodo2;
    }

    public double getNotaPeriodo3() {
        return notaPeriodo3;
    }

    public void setNotaPeriodo3(double notaPeriodo3) {
        this.notaPeriodo3 = notaPeriodo3;
    }

    public double getNotaPeriodo4() {
        return notaPeriodo4;
    }

    public void setNotaPeriodo4(double notaPeriodo4) {
        this.notaPeriodo4 = notaPeriodo4;
    }

    public double getNotaPeriodo1() {
        return notaPeriodo1;
    }

    public void setNotaPeriodo1(double notaPeriodo1) {
        this.notaPeriodo1 = notaPeriodo1;
    }





    public String getNombre_materia() {
        return nombre_materia;
    }

    public void setNombre_materia(String nombre_materia) {
        this.nombre_materia = nombre_materia;
    }


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

    public String getId_materia() {
        return id_materia;
    }

    public void setId_materia(String id_materia) {
        this.id_materia = id_materia;
    }


    public String getPeriodo_actual() {
        return periodo_actual;
    }

    public void setPeriodo_actual(String periodo_actual) {
        this.periodo_actual = periodo_actual;
    }
}
