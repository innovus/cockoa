package com.example.android.cokoa.Models;

/**
 * Created by ASUS on 8/09/2016.
 */
public class HorarioDeAtencion {
    private String nombreDocente;
    private String diaAtencion;
    private String horaAtencion;

    public String getNombreDocente() {
        return nombreDocente;
    }

    public void setNombreDocente(String nombreDocente) {
        this.nombreDocente = nombreDocente;
    }

    public String getDiaAtencion() {
        return diaAtencion;
    }

    public void setDiaAtencion(String diaAtencion) {
        this.diaAtencion = diaAtencion;
    }

    public String getHoraAtencion() {
        return horaAtencion;
    }

    public void setHoraAtencion(String horaAtencion) {
        this.horaAtencion = horaAtencion;
    }
}
