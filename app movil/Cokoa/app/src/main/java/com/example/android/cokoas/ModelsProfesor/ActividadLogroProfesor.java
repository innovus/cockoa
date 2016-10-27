package com.example.android.cokoas.ModelsProfesor;

/**
 * Created by ASUS on 26/07/2016.
 */
public class ActividadLogroProfesor {
    private String nombreActividad;
    private String idActividad;
    private boolean casilla;

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
