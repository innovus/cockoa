package com.example.android.cokoa.Models;

/**
 * Created by ASUS on 09/06/2016.
 */
public class Logro {
    private String id_materia;
    private String id_logro;
    private String numero_periodo;

    private String titulo_logro;
    private String desc_logro;
    private double nota_logro;
    private  double porcentajeLogro;

    public double getPorcentajeLogro() {
        return porcentajeLogro;
    }

    public void setPorcentajeLogro(double porcentajeLogro) {
        this.porcentajeLogro = porcentajeLogro;
    }

    public double getNota_logro() {
        return nota_logro;
    }

    public void setNota_logro(double nota_logro) {
        this.nota_logro = nota_logro;
    }

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



    public String getNumero_periodo() {
        return numero_periodo;
    }

    public void setNumero_periodo(String numero_periodo) {
        this.numero_periodo = numero_periodo;
    }


}
