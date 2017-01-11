package com.example.android.cokoas.ModelsProfesor;

/**
 * Created by ASUS on 25/07/2016.
 */
public class LogroProfesor {
    private String nombreLogro;
    private String idLogro;
    private String descripcionLogro;
    private String id_curso;
    private String id_carga_docente;
    private String porcentajeLogro;

    public String getPorcentajeLogro() {
        return porcentajeLogro;
    }

    public void setPorcentajeLogro(String porcentajeLogro) {
        this.porcentajeLogro = porcentajeLogro;
    }

    public String getId_curso() {
        return id_curso;
    }

    public void setId_curso(String id_curso) {
        this.id_curso = id_curso;
    }

    public String getId_carga_docente() {
        return id_carga_docente;
    }

    public void setId_carga_docente(String id_carga_docente) {
        this.id_carga_docente = id_carga_docente;
    }

    public String getDescripcionLogro() {
        return descripcionLogro;
    }

    public void setDescripcionLogro(String descripcionLogro) {
        this.descripcionLogro = descripcionLogro;
    }

    public String getNombreLogro() {
        return nombreLogro;
    }

    public void setNombreLogro(String nombreLogro) {
        this.nombreLogro = nombreLogro;
    }

    public String getIdLogro() {
        return idLogro;
    }

    public void setIdLogro(String idLogro) {
        this.idLogro = idLogro;
    }
}
