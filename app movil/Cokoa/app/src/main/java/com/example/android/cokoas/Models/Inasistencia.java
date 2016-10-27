package com.example.android.cokoas.Models;

/**
 * Created by ASUS on 30/06/2016.
 */
public class Inasistencia {
    public String getNombreMateria() {
        return nombreMateria;
    }

    public void setNombreMateria(String nombreMateria) {
        this.nombreMateria = nombreMateria;
    }

    public String getTotalInasistencia() {
        return totalInasistencia;
    }

    public void setTotalInasistencia(String totalInasistencia) {
        this.totalInasistencia = totalInasistencia;
    }

    public String getIdMateria() {
        return idMateria;
    }

    public void setIdMateria(String idMateria) {
        this.idMateria = idMateria;
    }

    private String idMateria;
    private String nombreMateria;
    private String totalInasistencia;

}
