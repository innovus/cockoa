package com.example.android.cokoa.Models;

/**
 * Created by ASUS on 10/06/2016.
 */
public class NotaActividad {

    public String getNombreActividad() {
        return nombreActividad;
    }

    public void setNombreActividad(String nombreActividad) {
        this.nombreActividad = nombreActividad;
    }

    public String getDescActividad() {
        return descActividad;
    }

    public void setDescActividad(String descActividad) {
        this.descActividad = descActividad;
    }

    public String getNotaActividad() {
        return notaActividad;
    }

    public void setNotaActividad(String notaActividad) {
        this.notaActividad = notaActividad;
    }

    private String nombreActividad;
    private String descActividad;
    private String notaActividad;
}
