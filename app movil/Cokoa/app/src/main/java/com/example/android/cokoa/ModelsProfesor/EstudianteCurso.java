package com.example.android.cokoa.ModelsProfesor;

/**
 * Created by ASUS on 13/07/2016.
 */
public class EstudianteCurso {

    private String numeroLista;
    private String codigoEstudiante;
    private String nombreEstudiante;
    private String notaEstudiante;
    private boolean inasistencia;
    private String fecha;
    private String idActividad;

    public String getIdActividad() {
        return idActividad;
    }

    public void setIdActividad(String idActividad) {
        this.idActividad = idActividad;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public boolean isInasistencia() {
        return inasistencia;
    }

    public void setInasistencia(boolean inasistencia) {
        this.inasistencia = inasistencia;
    }

    public String getNotaEstudiante() {
        return notaEstudiante;
    }

    public void setNotaEstudiante(String notaEstudiante) {
        this.notaEstudiante = notaEstudiante;
    }

    public String getNumeroLista() {
        return numeroLista;
    }

    public void setNumeroLista(String numeroLista) {
        this.numeroLista = numeroLista;
    }

    public String getCodigoEstudiante() {
        return codigoEstudiante;
    }

    public void setCodigoEstudiante(String codigoEstudiante) {
        this.codigoEstudiante = codigoEstudiante;
    }

    public String getNombreEstudiante() {
        return nombreEstudiante;
    }

    public void setNombreEstudiante(String nombreEstudiante) {
        this.nombreEstudiante = nombreEstudiante;
    }
}
