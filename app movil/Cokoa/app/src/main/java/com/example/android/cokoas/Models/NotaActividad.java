package com.example.android.cokoas.Models;

/**
 * Created by ASUS on 10/06/2016.
 */
public class NotaActividad {

    private String idnotaActividad;

    public String getIdnotaActividad() {
        return idnotaActividad;
    }

    public void setIdnotaActividad(String idnotaActividad) {
        this.idnotaActividad = idnotaActividad;
    }

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

    private String descripcionLogro;

    public String getDescripcionLogro() {
        return descripcionLogro;
    }

    public void setDescripcionLogro(String descripcionLogro) {
        this.descripcionLogro = descripcionLogro;
    }
}
