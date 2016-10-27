package com.example.android.cokoas.Models;

/**
 * Created by ASUS on 30/06/2016.
 */
public class InasistenciaMateria {
    private String nombreMateria;
    private String nombreProfesor;
    private String numeroPeriodo;
    private String fechaInasistencia;
    private String tipoInasistencia;
    private String justificadaInasistencia;

    public String getNombreMateria() {
        return nombreMateria;
    }

    public void setNombreMateria(String nombreMateria) {
        this.nombreMateria = nombreMateria;
    }

    public String getNombreProfesor() {
        return nombreProfesor;
    }

    public void setNombreProfesor(String nombreProfesor) {
        this.nombreProfesor = nombreProfesor;
    }

    public String getNumeroPeriodo() {
        return numeroPeriodo;
    }

    public void setNumeroPeriodo(String numeroPeriodo) {
        this.numeroPeriodo = numeroPeriodo;
    }

    public String getFechaInasistencia() {
        return fechaInasistencia;
    }

    public void setFechaInasistencia(String fechaInasistencia) {
        this.fechaInasistencia = fechaInasistencia;
    }

    public String getTipoInasistencia() {
        return tipoInasistencia;
    }

    public void setTipoInasistencia(String tipoInasistencia) {
        this.tipoInasistencia = tipoInasistencia;
    }

    public String getJustificadaInasistencia() {
        return justificadaInasistencia;
    }

    public void setJustificadaInasistencia(String justificadaInasistencia) {
        this.justificadaInasistencia = justificadaInasistencia;
    }
}
