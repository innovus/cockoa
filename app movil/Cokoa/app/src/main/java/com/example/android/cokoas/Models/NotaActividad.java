package com.example.android.cokoas.Models;

/**
 * Created by ASUS on 10/06/2016.
 */
public class NotaActividad {

    private String idnotaActividad;
    private String nombreActividad;
    private String descActividad;
    private String notaActividad;
    private String descripcionLogro;
    private String porcentajeActividad;

    public String getPorcentajeActividad() {
        return porcentajeActividad;
    }

    public void setPorcentajeActividad(String porcentajeActividad) {
        this.porcentajeActividad = porcentajeActividad;
    }

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



    public String getDescripcionLogro() {
        return descripcionLogro;
    }

    public void setDescripcionLogro(String descripcionLogro) {
        this.descripcionLogro = descripcionLogro;
    }
}
