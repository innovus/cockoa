package com.example.android.cokoas.ModelsProfesor;

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

    private String idCargaDocente;
    private boolean notaActividad;
    private String idCurso;

    public String getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(String idCurso) {
        this.idCurso = idCurso;
    }

    public boolean isNotaActividad() {
        return notaActividad;
    }

    public void setNotaActividad(boolean notaActividad) {
        this.notaActividad = notaActividad;
    }

    public String getIdCargaDocente() {
        return idCargaDocente;
    }

    public void setIdCargaDocente(String idCargaDocente) {
        this.idCargaDocente = idCargaDocente;
    }

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
