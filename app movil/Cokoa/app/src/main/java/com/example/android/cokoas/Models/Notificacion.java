package com.example.android.cokoas.Models;

/**
 * Created by ASUS on 8/09/2016.
 */
public class Notificacion {
    private String idNotificacion;
    private String tipoNotificacion;
    private String mensajeNotificacion;
    private String fechaNotificacion;
    private String idEstudiante;

    private String guia;

    private String estadoNotificaion;

    public String getEstadoNotificaion() {
        return estadoNotificaion;
    }

    public void setEstadoNotificaion(String estadoNotificaion) {
        this.estadoNotificaion = estadoNotificaion;
    }

    public String getIdEstudiante() {
        return idEstudiante;
    }

    public void setIdEstudiante(String idEstudiante) {
        this.idEstudiante = idEstudiante;
    }



    public String getGuia() {
        return guia;
    }

    public void setGuia(String guia) {
        this.guia = guia;
    }

    public String getIdNotificacion() {
        return idNotificacion;
    }

    public void setIdNotificacion(String idNotificacion) {
        this.idNotificacion = idNotificacion;
    }

    public String getTipoNotificacion() {
        return tipoNotificacion;
    }

    public void setTipoNotificacion(String tipoNotificacion) {
        this.tipoNotificacion = tipoNotificacion;
    }

    public String getMensajeNotificacion() {
        return mensajeNotificacion;
    }

    public void setMensajeNotificacion(String mensajeNotificacion) {
        this.mensajeNotificacion = mensajeNotificacion;
    }

    public String getFechaNotificacion() {
        return fechaNotificacion;
    }

    public void setFechaNotificacion(String fechaNotificacion) {
        this.fechaNotificacion = fechaNotificacion;
    }


}
