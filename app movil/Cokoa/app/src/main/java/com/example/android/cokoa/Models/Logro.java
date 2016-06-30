package com.example.android.cokoa.Models;

/**
 * Created by ASUS on 09/06/2016.
 */
public class Logro {
    public String getTitulo_logro() {
        return titulo_logro;
    }

    public void setTitulo_logro(String titulo_logro) {
        this.titulo_logro = titulo_logro;
    }

    public String getDesc_logro() {
        return desc_logro;
    }

    public void setDesc_logro(String desc_logro) {
        this.desc_logro = desc_logro;
    }

    private String titulo_logro;
    private String desc_logro;

    public String getId_materia() {
        return id_materia;
    }

    public void setId_materia(String id_materia) {
        this.id_materia = id_materia;
    }

    public String getId_logro() {
        return id_logro;
    }

    public void setId_logro(String id_logro) {
        this.id_logro = id_logro;
    }

    private String id_materia;
    private String id_logro;
    private String numero_periodo;

    public String getNumero_periodo() {
        return numero_periodo;
    }

    public void setNumero_periodo(String numero_periodo) {
        this.numero_periodo = numero_periodo;
    }


}
