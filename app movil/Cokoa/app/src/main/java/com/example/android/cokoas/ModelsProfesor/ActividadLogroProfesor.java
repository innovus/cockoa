package com.example.android.cokoas.ModelsProfesor;

/**
 * Created by ASUS on 26/07/2016.
 */
public class ActividadLogroProfesor {
    private String nombreActividad;
    private String idActividad;
    private boolean casilla;
    private String idCurso;
    private String idCargaDocente;
    private String porcentajeActividad;

    public String getPorcentajeActividad() {
        return porcentajeActividad;
    }

    public void setPorcentajeActividad(String porcentajeActividad) {
        this.porcentajeActividad = porcentajeActividad;
    }

    public String getIdCurso() {
        return idCurso;
    }

    public void setIdCurso(String idCurso) {
        this.idCurso = idCurso;
    }

    public String getIdCargaDocente() {
        return idCargaDocente;
    }

    public void setIdCargaDocente(String idCargaDocente) {
        this.idCargaDocente = idCargaDocente;
    }

    public boolean isCasilla() {
        return casilla;
    }

    public void setCasilla(boolean casilla) {
        this.casilla = casilla;
    }

    public String getIdActividad() {
        return idActividad;
    }

    public void setIdActividad(String idActividad) {
        this.idActividad = idActividad;
    }

    public String getNombreActividad() {
        return nombreActividad;
    }

    public void setNombreActividad(String nombreActividad) {
        this.nombreActividad = nombreActividad;
    }
}
