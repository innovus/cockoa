package com.example.android.cokoas.ModelsProfesor;

/**
 * Created by ASUS on 05/07/2016.
 */
public class CursosProfesor {

    private String id_Curso;

    private String grado;
    private String curso;
    private String  nombreMateria;
    private String idCargaDocente;

    public String getIdCargaDocente() {
        return idCargaDocente;
    }

    public void setIdCargaDocente(String idCargaDocente) {
        this.idCargaDocente = idCargaDocente;
    }

    public String getNombreMateria() {
        return nombreMateria;
    }

    public void setNombreMateria(String nombreMateria) {
        this.nombreMateria = nombreMateria;
    }

    public String getId_Curso() {
        return id_Curso;
    }

    public void setId_Curso(String id_Curso) {
        this.id_Curso = id_Curso;
    }

    public String getGrado() {
        return grado;
    }

    public void setGrado(String grado) {
        this.grado = grado;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }


}
