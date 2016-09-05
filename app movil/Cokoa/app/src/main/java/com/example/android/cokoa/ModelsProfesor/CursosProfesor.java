package com.example.android.cokoa.ModelsProfesor;

/**
 * Created by ASUS on 05/07/2016.
 */
public class CursosProfesor {

    private String id_Curso;

    private String grado;
    private String curso;
    private String  nombreMateria;

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
